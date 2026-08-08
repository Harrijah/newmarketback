<?php

namespace App\Controllers;

use PhpOffice\PhpSpreadsheet\IOFactory;
use CodeIgniter\Controller;
use CodeIgniter\HTTP\ResponseInterface;
use GuzzleHttp\Client;  // Import correct de la classe Guzzle

helper(['url', 'file']);

class Others extends BaseController
{
    private $stopwords = ['le', 'la', 'les', 'de', 'du', 'des', "l'", 'et'];

    public function processExcel()
    {
        ini_set('max_execution_time', 300); // Temps d'exécution augmenté
        $file = $this->request->getFile('excel_file');
        if (!$file->isValid()) {
            return $this->response->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST)
                                  ->setJSON(['error' => 'Fichier Excel invalide.']);
        }

        $filePath = WRITEPATH . 'uploads/' . $file->getName();
        $file->move(WRITEPATH . 'uploads', $file->getName());

        $excelData = $this->processExcelFile($filePath);
        unlink($filePath);

        return $this->response->setStatusCode(ResponseInterface::HTTP_OK)
                             ->setHeader('Access-Control-Allow-Origin', '*')
                             ->setJSON($excelData);
    }

    private function processExcelFile($filePath)
    {
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $data = $sheet->toArray();
        $results = [];

        foreach ($data as $index => $row) {
            if ($index === 0 || count($row) < 3) {
                continue; // Ignorer l'en-tête et les lignes incomplètes
            }

            $url = trim($row[0]);            // URL LinkedIn
            $companyName = strtolower(trim($row[1]));
            $city = strtolower(trim($row[2]));

            if ($url && $companyName && $city) {
                [$trustScore, $matchingKeywords] = $this->exploreLinkedInPage($url, $companyName, $city);
                $row[] = $trustScore;
                $row[] = $matchingKeywords;
            } else {
                $row[] = 'Données manquantes';
                $row[] = '';
            }

            $results[] = $row;
        }

        return $results;
    }

    private function exploreLinkedInPage($url, $companyName, $city)
    {
        try {
            $client = new \GuzzleHttp\Client([
                'headers' => [
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                ]
            ]);
            
            $response = $client->request('GET', $url, ['timeout' => 10]);

            if ($response->getStatusCode() === 200) {
                $pageContent = strtolower($response->getBody());
                return $this->calculateTrustScore($companyName, $city, $pageContent);
            }
        } catch (\Exception $e) {
            return [0, "Erreur d'accès à l'URL"];
        }

        return [0, ''];
    }

    private function calculateTrustScore($companyName, $city, $pageText)
    {
        $score = 0;
        $matchingKeywords = [];

        if (strpos($pageText, $city) !== false) {
            $score += 40;
            $matchingKeywords[] = ucfirst($city);
        }

        $keywords = array_filter(
            preg_split('/\s+/', $companyName),
            fn($word) => !in_array($word, $this->stopwords)
        );

        if (!empty($keywords)) {
            $keywordScore = 60 / count($keywords);
            foreach ($keywords as $keyword) {
                if (strpos($pageText, $keyword) !== false) {
                    $score += $keywordScore;
                    $matchingKeywords[] = ucfirst($keyword);
                }
            }
        }

        return [round($score, 2), implode(', ', array_unique($matchingKeywords))];
    }
}
