<?php 
    Namespace App\Controllers;
    Use App\Models\StatusModel;
    
    class Status extends BaseController
    {
        public function getstatus ()
        {
            $model = model(StatusModel::class);
            $success = $model->getstatus();

            // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($success);
            return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($success);
        }
    }