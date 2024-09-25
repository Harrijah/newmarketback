<?php

Namespace App\Models;
Use CodeIgniter\Model;

class ProduitModel extends Model
{
    protected $table = 'produits';
    protected $allowedFields = [
        'storeid', 'userid', 'nomproduit', 'rayon', 'categorie', 'souscategorie', 
        'reference', 'marque', 'prix', 'courtdescript', 'longdescript',
        'image01', 'image02', 'image03', 'image04', 'image05', 'image06'
    ];

    /**
     * Ajoute un produit avec ses images
     *
     * @param array $data Données du produit et des images
     * @return mixed
     */
    public function addProduct(array $data)
    {
        // Validez les données avant insertion si nécessaire
        if ($this->validateData($data)) {
            // Insérez les données dans la base
            return $this->insert($data);
        } else {
            // Gérer les erreurs de validation
            return false; // Vous pouvez retourner des erreurs personnalisées ici
        }
    }

    public function modifyProduct($data)
    {
        return $this->where('id', $data['id'])->set($data)->update();
    }

    /**
     * Valide les données du produit avant insertion
     *
     * @param array $data Données du produit à valider
     * @return bool
     */
    private function validateData(array $data): bool
    {
        // Ajouter vos règles de validation ici
        // Par exemple, vérifier que les champs obligatoires sont présents
        if (empty($data['nomproduit'])) {
            return false;
        }
        
        // Valider les autres champs en fonction de vos besoins
        return true;
    }

    public function getproduct()
    {
        return $this->findAll();
    }

    public function getoneproduct($id)
    {
        return $this->find($id);
    }

    public function deleteproduct($id)
    {
        $this->where('id', $id);
        return $this->delete();
    }






}
