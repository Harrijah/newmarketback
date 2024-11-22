<?php
    Namespace App\Controllers;
    Use App\Models\SouscatModel;


    class SousCat extends BaseController
    {
        public function getsouscat()
        {
            $model = model(SouscatModel::class);
            $data = $model->getsouscat();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($data);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($data);

        }

        public function addsouscat()
        {
            $model = model(SouscatModel::class);
            $response = $model->addsouscat();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);

        }

    }