<?php

    Namespace App\Models;
    Use CodeIgniter\Model;

    protected $table = 'ads';
    protected $allowedFields = ['titre', 'userid', 'storeid', 'imagepub', 'texte', 'lien'];


    class AdsModel extends Model
    {

        
        
        public function addAds($data)
        {
            if($this->validateData($data)){
                return $this->insert($data);
            } else {
                return false;
            }
        }
        
        public function getAds($data){
            return $this->findAll();
        }
        
    }