<?php 
    Namespace App\Models;
    Use CodeIgniter\Model;

    class UserModel extends Model
    {
        protected $table = 'users';
        protected $allowedFields = ['role', 'niveau', 'nom', 'prenom', 'email', 'pwd', 'adresse', 'ville', 'codepostal', 'pays', 'telephone', 'createdat', 'updatedat', 'store'];
        protected $beforeInsert = ['beforeInsert'];
        protected $beforeUpdate = ['beforeUpdate'];

        protected function passwordHash($data)
        {
            if(isset($data['data']['pwd']))
            {
                $data['data']['pwd'] = password_hash($data['data']['pwd'], PASSWORD_DEFAULT);
            }
            return $data;
        }

        protected function beforeInsert(array $data)
        {
            $data = $this->passwordHash($data);
            return $data;
        }

        protected function beforeUpdate(array $data)
        {
            $data = $this->passwordHash($data);
            return $data;
        }

        public function createaccount()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);

            $data = [
                'role' => $jsonData['role'],
                'niveau' => $jsonData['niveau'],
                'nom' => $jsonData['nom'],
                'prenom' => $jsonData['prenom'],
                'email' => $jsonData['email'],
                'pwd' => $jsonData['pwd'],
                'adresse' => $jsonData['adresse'],
                'ville' => $jsonData['ville'],
                'codepostal' => $jsonData['codepostal'],
                'pays' => $jsonData['pays'],
                'telephone' => $jsonData['telephone'],
                'createdat' => $jsonData['createdat'],
                'updatedat' => $jsonData['updatedat'],
            ];
            return $this->insert($data);
        }
        public function connectme(){
            $jsonData = json_decode(file_get_contents('php://input'), true);

            $data = [
                'email' => $jsonData['email'],
                'pwd' => $jsonData['pwd'],
            ];
           $user = $this
           ->where('email', $data['email'])
        //    ->where('pwd', $data['pwd'])
           ->first();

           return $user;
        }

        public function updateinfo()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);
            // Vérifier si le décodage a réussi
            if ($jsonData === null) {
                http_response_code(400); // Code d'erreur BadRequest
                echo json_encode(['error' => 'Invalid JSON']);
                exit;
            }
            
            $this->where('id', $jsonData['id'])->set([
                $jsonData['name'] => $jsonData['input'],
                'updatedat' => $jsonData['updatedat'],
            ]);
            $this->update();
        }

    }