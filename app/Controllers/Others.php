<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
helper(['url']);

class Others extends BaseController
{
    public function getDuration()
    {
        
        // Obtenir les paramètres GET
        $origins = $this->request->getGet('origins');
        $destinations = $this->request->getGet('destinations');

        // Vérifier que les paramètres sont fournis
        if (empty($origins) || empty($destinations)) {
            return $this->response->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST)
                                  ->setJSON(['error' => 'Les paramètres origins et destinations sont requis']);
        }

        // Clé API Google (remplacez par votre clé)
        $apiKey = 'AIzaSyCGCcE2Xk-MhhaV9-hb8KoexuZoEupGo1I';

        // Construire l'URL pour la requête API
        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?" . http_build_query([
            'origins' => $origins,
            'destinations' => $destinations,
            'key' => $apiKey,
            'mode' => 'driving',
        ]);

        // Faire la requête à l'API Google Distance Matrix
        $curlRequest = \Config\Services::curlrequest();
        $client = \Config\Services::curlrequest();
        // $response = $client->get($url);
        $response = $curlRequest->request('GET', $url, [
            'verify' => false
        ]);

        // Vérifier si la requête a réussi
        if ($response->getStatusCode() !== 200) {
            return $this->response->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR)
                                  ->setJSON(['error' => 'Erreur lors de la requête vers l\'API Google']);
        }

        // Renvoyer la réponse JSON au frontend
        return $this->response->setStatusCode(ResponseInterface::HTTP_OK)
                            // ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                            ->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')
                            ->setJSON(json_decode($response->getBody()));
    }
}
