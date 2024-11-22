<?php
    Namespace App\Controllers;
    Use App\Models\StoreModel;

    helper(['form', 'url']);

    class Store extends BaseController
    {
        public function createnewstore()
        {
            // --------------------- CORS : indispensable 14/05/24 ---------------------
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Allow-Credentials: true');

            $model = model(StoreModel::class);

            $validationRules = [
                'nommagasin' => 'required|min_length[2]|max_length[100]',
                'email' => 'required|valid_email',
                'phone' => 'required|min_length[8]|max_length[15]',
                'categorie' => 'required',
                'description' => 'required|max_length[2000]',
            ];

            if($this->validate($validationRules)){
                $success = $model->createnewstore();

                if($success){
                    $response = ['message' => 'Magasin créé avec succès'];
                } else {
                    $response = ['message' => 'Echec lors de la création de la boutique'];
                }
                echo json_encode($response);
            }
        }

        public function getstore($id)
        {
            $model = model(StoreModel::class);

            $data = $model->getstore($id);
            // var_dump($data);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($data);
            return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($data);
        }
        public function getallstore()
        {
            $model = model(StoreModel::class);
            $data = $model->getallstore();

            // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($data);
            return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($data);
        }

        public function updatestoreinfo()
        {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Allow-Credentials: true');
            
            $model = model(StoreModel::class);
            $update = $model->updatestoreinfo();

            if($update){
                $response = json_encode(['success' => true, 'message' => 'Information mise à jour avec succès']);
            } else {
                $response = json_encode(['success' => false, 'message' => 'Il y a eu un problème dans la mise à jour']);
            }

            return $response;
        }



    }