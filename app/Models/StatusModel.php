<?php
    Namespace App\Models;
    Use CodeIgniter\Model;

    class StatusModel extends Model
    {
        protected $table = 'commandstatus';
        protected $allowedFields = ['id', 'name'] ;
        
        public function getstatus()
        {
            return $this->findAll();
        }
    }


