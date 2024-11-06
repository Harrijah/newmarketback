<?php
    Namespace App\Models;
    use CodeIgniter\Model;


    class CommandModel extends Model
    {
        protected $table = 'commandes';
        protected $allowedFields = ['id', 'payref', 'clientid', 'products', 'datecommande', 'status', 'datelivraison', 'lieulivraison', 'aboutcustomer', 'totalprix'];

        public function addcommand()
        {
            $jsondata = json_decode(file_get_contents('php://input'), true);
            $data = [
                'id' => $jsondata['id'],
                'payref' => $jsondata['payref'],
                'clientid' => $jsondata['clientid'],
                'products' => $jsondata['products'],
                'datecommande' => $jsondata['datecommande'],
                'status' => $jsondata['status'],
                'datelivraison' => $jsondata['datelivraison'],
                'lieulivraison' => $jsondata['lieulivraison'],
                'aboutcustomer' => $jsondata['aboutcustomer'],
                'totalprix' => $jsondata['totalprix'],
            ];
            return $this->insert($data);
        }

        public function getcommand($clientid)
        {
            $this->where('clientid', $clientid);
            return $this->findAll();
        }

    }