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

        }

        public function addsouscat()
        {
            $model = model(SouscatModel::class);
            $response = $model->addsouscat();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);

        }

    }