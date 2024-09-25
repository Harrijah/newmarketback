<?php 
    Namespace App\Models;
    Use CodeIgniter\Model;

    class RayonModel extends Model
    {
        protected $table = 'rayon';
        protected $allowedFields = ['rayon'];

        public function getrayon()
        {
            return $this->findAll();
        }

        public function addrayon()
        {
            $jsonData = json_decode(file_get_contents('php://input'), true);

            $data = [
                'rayon' => $jsonData['rayon'],
            ];
            $this->insert($data);
            return $this->getrayon();
        }




    }

