<?php
    Namespace App\Models;
    Use CodeIgniter\Model;

    class MarqueModel extends Model
    {
        protected $table = 'marque';
        protected $allowedFields = ['marque', 'idrayon'];

        public function getmarque()
        {
            return $this->findAll();
        }

        public function addmarque()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);
            $data = [
                'marque' => $jsonData['marque'],
                'idrayon' => $jsonData['idrayon'],
            ];
            $this->insert($data);
            return $this->getmarque();
        }


    }