<?php 
    Namespace App\Controllers;
    use App\Models\CommandModel;

    class Command extends BaseController
    {
        public function addcommand()
        {
            
            // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            // header('Access-Control-Allow-Methods: POST, OPTIONS');
            // header('Access-Control-Allow-Headers: Content-Type');
            // header('Access-Control-Allow-Credentials: true');

            $model = model(CommandModel::class);
            $validationRules = [
                'id' => 'required',
                'telephone' => 'required'
            ];

            // if($this->validate($validationRules)){
                $success = $model->addcommand();
                return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($success);

                // if($success){
                //     $response = ['réponse' => 'commande ajoutée avec succès'];
                // } else {
                //     $response = ['réponse' => 'il y a eu un souci'];
                // }
            // }
        }
    }
