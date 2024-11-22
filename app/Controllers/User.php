<?php
    Namespace App\Controllers;

    Use App\Models\UserModel;
    helper(['form', 'session']);

    class User extends BaseController
    {
        public function createaccount()
        {
            // --------------------- CORS : indispensable 14/05/24 ---------------------
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Allow-Credentials: true');

            $user = model(UserModel::class);

            $validationRules = [
                'nom' => 'required|min_length[2]|max_length[100]',
                'prenom' => 'required|min_length[2]|max_length[100]',
                'email' => 'required|max_length[100]|valid_email|is_unique[users.email]',
                'pwd' => 'required',
                // 'pwdconfirm' => 'required|matches[pwd]',
            ];

            // ------------ Valider les rules du formulaire ---------------
            if($this->validate($validationRules)){
                $success = $user->createaccount();

                if($success){
                    $response = [
                        'success' => true,
                        'message' => 'Votre compte a été créé avec succès'
                    ];
                } else {
                    $response = [
                        'success' => false,
                        'message' => 'Un problème est survenu lors de l\'enregistrement de votre compte ! ',
                    ];
                }
                echo json_encode($response);
            } else {
                echo('Une erreur s\'est produite');

            }
        }

        private function setUserSession($user)
        {
            $session = session();
            $data = [
                'role' => $user['role'],
                'niveau' => $user['niveau'],
                'nom' => $user['nom'],
                'prenom' => $user['prenom'],
                'email' => $user['email'],
                'pwd' => $user['pwd'],
                'adresse' => $user['adresse'],
                'ville' => $user['ville'],
                'codepostal' => $user['codepostal'],
                'pays' => $user['pays'],
                'telephone' => $user['telephone'],
                'createdat' => $user['createdat'],
                'updatedat' => $user['updatedat'],
            ];

            session()->set($data);
            return true;
        }

        public function connectme()
        {
            $usermodel = model(UserModel::class);
            $user = $usermodel->connectme();

            $validationRules = [
                'email' => 'required|min_length[7]|max_length[100]|valid_email',
                'pwd' => 'required|min_length[4]|max_length[200]',
            ];
            $errors = [
                'pwd' => [
                    'validateUser' => 'Email/Mot de passe non valide',
                ]
            ];

            if($this->validate($validationRules, $errors)){

                $this->setUserSession($user);
                // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($user);
                return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($user);

            } else {
                //
            }

        }

        public function disconnect()
        {
            $session = session();
            $session->destroy();
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON(['isConnected' => false]);
            return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON(['isConnected' => false]);
        }

        public function updateinfo()
        {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: PUT, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Allow-Credentials: true');
    
            $model = model(UserModel::class);
            $update = $model->updateinfo();

            if($update){
                $response = ['success' => true, 'message' => 'Information mise à jour avec succès'];
            } else {
                $response = ['success' => false, 'message' => 'Il y a eu un caca lors de la mise a jour'];
            }

            echo json_encode($response);
        }
        
    }