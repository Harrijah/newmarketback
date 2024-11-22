<?php 
    Namespace App\Controllers;
    use App\Models\CommandModel;

    class Command extends BaseController
    {
        public function addcommand()
        {
            // header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Origin: https://trade.axel.mg');
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Allow-Credentials: true');

            $model = model(CommandModel::class);
            $validationRules = [
                'id' => 'required',
                'telephone' => 'required'
            ];

            // if($this->validate($validationRules)){
                $success = $model->addcommand();
                // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($success);
                return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($success);
        }

        public function getcommand($id)
        {
            $model = model(Commandmodel::class);
            $response = $model->getcommand($id);

            // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
        }


    }
