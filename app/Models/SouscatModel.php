<?php
    Namespace App\Models;
    Use CodeIgniter\Model;

    class SouscatModel extends Model
    {
        protected $table = 'souscategorie';
        protected $allowedFields = ['souscategorie', 'idcategorie'];

        public function getsouscat()
        {
            return $this->findAll();
        }

        public function addsouscat()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);

            $data = [
                'souscategorie' => $jsonData['souscategorie'],
                'idcategorie' => $jsonData['idcategorie'],
            ];

            $this->insert($data);

            return $this->getsouscat();

        }


    }