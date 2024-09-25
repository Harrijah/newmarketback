<?php
    Namespace App\Controllers;
    Use App\Models\MarqueModel;

    class Marque extends BaseController
    {
        public function getmarque()
        {
            $model = model(MarqueModel::class);
            $response = $model->getmarque();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
        }

        public function addmarque()
        {
            $model = model(MarqueModel::class);
            $response = $model->addmarque();

            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
        }

    }