<?php
namespace App\Models;
use CodeIgniter\Model;

class Contactmodel extends Model
{
    protected $table = 'contact';
    protected $allowedFields = ['nom_societe', 'telephone', 'email', 'ville', 'message'];

    public function getcontact()
    {
        $data = [
            'nom_societe' => ($_POST['nom_societe']),
            'telephone'   => ($_POST['telephone']),
            'email'       => ($_POST['email']),
            'ville'       => ($_POST['ville']),
            'message'     => ($_POST['message']),
        ];

        return $this->insert($data);
    }
}