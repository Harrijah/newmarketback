<?php
    Namespace App\Controllers;
    Use App\Models\CategorieModel;

    class Categorie extends BaseController
    {
        public function getcategorie()
        {
            // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            // header('Access-Control-Allow-Methods: POST, OPTIONS');
            // header('Access-Control-Allow-Headers: Content-Type');
            // header('Access-Control-Allow-Credentials: true');
            $model = model(CategorieModel::class);
            $response = $model->getcategorie();
            
            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
        }

        public function addcategorie()
        {
            $model = model(CategorieModel::class);
            $response = $model->addcategorie();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
        }

    }