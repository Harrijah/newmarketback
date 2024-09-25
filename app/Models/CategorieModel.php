<?php
    Namespace App\Models;
    Use CodeIgniter\Model;

    class CategorieModel extends Model
    {
        protected $table = 'categorie';
        protected $allowedFields = ['categorie', 'idrayon'];

        public function getcategorie()
        {
            return $this->findAll();
        }

        public function addcategorie()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);

            $data = [
                'categorie' => $jsonData['categorie'],
                'idrayon' => $jsonData['idrayon'],
            ];
            $this->insert($data);
            return $this->getcategorie();
        }



    }