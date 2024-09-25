<?php 
    Namespace App\Models;
    Use CodeIgniter\Model;

    class StoreModel extends Model
    {
        protected $table = 'store';
        protected $allowedFields = ['nommagasin', 'adresse', 'email', 'phone', 'categorie', 'description', 'cgv', 'cgvtext', 'userid', 'createdat', 'updatedat'];

        public function createnewstore()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);

            // $jsonData = $this-request->getJSON();

            if($jsonData === null){
                http_response_code(400);
                echo(json_encode(['message' => 'Invalid JSON']));
                exit;
            } 

            $data = [
                'nommagasin' => $jsonData['nommagasin'],
                'adresse' => $jsonData['adresse'],
                'email' => $jsonData['email'],
                'phone' => $jsonData['phone'],
                'categorie' => $jsonData['categorie'],
                'description' => $jsonData['description'],
                'cgv' => $jsonData['cgv'],
                'cgvtext' => $jsonData['cgvtext'],
                'userid' => $jsonData['userid'],
                'createdat' => $jsonData['createdat'],
                'updatedat' => $jsonData['updatedat'],
            ];

            return $this->insert($data);


        }

        public function getstore($id)
        {
            return $this->where('userid', $id)->first();
        }

        public function getallstore()
        {
            return $this->findAll();
        }

        public function updatestoreinfo()
        {
            // $jsonData = $this->request->getJSON();
            $jsonData = json_decode(file_get_contents('php://input'), true);
            if($jsonData == null){
                http_response_code(400);
                echo json_encode(['message' => 'invalid JSON']);
            } 
            
            $this->where('id', $jsonData['id'])->set([
                $jsonData['name'] => $jsonData['input'],
                'updatedat' => $jsonData['updatedat'],
            ]);
            return $this->update();
        }


    }