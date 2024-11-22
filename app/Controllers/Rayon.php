<?php
    Namespace App\Controllers;
    Use App\Models\RayonModel;

    class Rayon extends BaseController
    {
        public function addrayon()
        {
            
            // --------------------- CORS : indispensable 14/05/24 ---------------------
            // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            // header('Access-Control-Allow-Methods: POST, OPTIONS');
            // header('Access-Control-Allow-Headers: Content-Type');
            // header('Access-Control-Allow-Credentials: true');

            $model = model(RayonModel::class);
            $response = $model->addrayon();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);

        }

        public function getrayon()
        {
            
            // --------------------- CORS : indispensable 14/05/24 ---------------------
            // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            // header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
            // header('Access-Control-Allow-Headers: Content-Type');
            // header('Access-Control-Allow-Credentials: true');

            $model = model(RayonModel::class);
            $response = $model->getrayon();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
        }

        


    }