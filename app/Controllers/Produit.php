<?php 
Namespace App\Controllers;
Use App\Models\ProduitModel;

class Produit extends BaseController
{
    public function addproduct()
    {
        $model = model(ProduitModel::class);

        // Récupération des fichiers uploadés
        $image01 = $this->request->getFile('image01');
        $image02 = $this->request->getFile('image02');
        $image03 = $this->request->getFile('image03');
        $image04 = $this->request->getFile('image04');
        $image05 = $this->request->getFile('image05');
        $image06 = $this->request->getFile('image06');

        $data = [
            'storeid' => $this->request->getPost('storeid'),
            'userid' => $this->request->getPost('userid'),
            'nomproduit' => $this->request->getPost('nomproduit'),
            'rayon' => $this->request->getPost('rayon'),
            'categorie' => $this->request->getPost('categorie'),
            'souscategorie' => $this->request->getPost('souscategorie'),
            'reference' => $this->request->getPost('reference'),
            'marque' => $this->request->getPost('marque'),
            'prix' => $this->request->getPost('prix'),
            'courtdescript' => $this->request->getPost('courtdescript'),
            'longdescript' => $this->request->getPost('longdescript')
        ];

        // Validation et Upload des fichiers
        if ($image01 && $image01->isValid() && !$image01->hasMoved()) {
            $image01->move(WRITEPATH . '../public/uploads');
            $data['image01'] = $image01->getName();
        }
        if ($image02 && $image02->isValid() && !$image02->hasMoved()) {
            $image02->move(WRITEPATH . '../public/uploads');
            $data['image02'] = $image02->getName();
        }
        if ($image03 && $image03->isValid() && !$image03->hasMoved()) {
            $image03->move(WRITEPATH . '../public/uploads');
            $data['image03'] = $image03->getName();
        }
        if ($image04 && $image04->isValid() && !$image04->hasMoved()) {
            $image04->move(WRITEPATH . '../public/uploads');
            $data['image04'] = $image04->getName();
        }
        if ($image05 && $image05->isValid() && !$image05->hasMoved()) {
            $image05->move(WRITEPATH . '../public/uploads');
            $data['image05'] = $image05->getName();
        }
        if ($image06 && $image06->isValid() && !$image06->hasMoved()) {
            $image06->move(WRITEPATH . '../public/uploads');
            $data['image06'] = $image06->getName();
        }
       
        // Insertion des données
        $success = $model->addProduct($data);

        if($success){
            $response = $model->getproduct();
            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
        } else {
            $response = ['message' => 'ça n\'a pas marché !!'];
        }
        
    }

    public function modifyProduct()
{
    $model = model(ProduitModel::class);
    
    // Récupération des fichiers uploadés
    $image01 = $this->request->getFile('image01');
    $image02 = $this->request->getFile('image02');
    $image03 = $this->request->getFile('image03');
    $image04 = $this->request->getFile('image04');
    $image05 = $this->request->getFile('image05');
    $image06 = $this->request->getFile('image06');

    // Récupération des données du formulaire
    $data = [
        'id' => $this->request->getPost('id'),
        'storeid' => $this->request->getPost('storeid'),
        'userid' => $this->request->getPost('userid'),
        'nomproduit' => $this->request->getPost('nomproduit') ?? 'cocola',
        'rayon' => $this->request->getPost('rayon'),
        'categorie' => $this->request->getPost('categorie'),
        'souscategorie' => $this->request->getPost('souscategorie'),
        'reference' => $this->request->getPost('reference'),
        'marque' => $this->request->getPost('marque'),
        'prix' => $this->request->getPost('prix'),
        'courtdescript' => $this->request->getPost('courtdescript'),
        'longdescript' => $this->request->getPost('longdescript'),
    ];

    // Validation et Upload des fichiers
    if ($image01 && $image01->isValid() && !$image01->hasMoved()) {
        $image01->move(WRITEPATH . '../public/uploads');
        $data['image01'] = $image01->getName();
    } else if (!$image01 && $this->request->getPost('image01') == "") {
        $data['image01'] = "";
    } 
    if ($image02 && $image02->isValid() && !$image02->hasMoved()) {
        $image02->move(WRITEPATH . '../public/uploads');
        $data['image02'] = $image02->getName();
    } else if (!$image02 && $this->request->getPost('image02') == "") {
        $data['image02'] = "";
    } 
    if ($image03 && $image03->isValid() && !$image03->hasMoved()) {
        $image03->move(WRITEPATH . '../public/uploads');
        $data['image03'] = $image03->getName();
    } else if (!$image03 && $this->request->getPost('image03') == "") {
        $data['image03'] = "";
    } 
    if ($image04 && $image04->isValid() && !$image04->hasMoved()) {
        $image04->move(WRITEPATH . '../public/uploads');
        $data['image04'] = $image04->getName();
    } else if (!$image04 && $this->request->getPost('image04') == "") {
        $data['image04'] = "";
    } 
    if ($image05 && $image05->isValid() && !$image05->hasMoved()) {
        $image05->move(WRITEPATH . '../public/uploads');
        $data['image05'] = $image05->getName();
    } else if (!$image05 && $this->request->getPost('image05') == "") {
        $data['image05'] = "";
    } 
    if ($image06 && $image06->isValid() && !$image06->hasMoved()) {
        $image06->move(WRITEPATH . '../public/uploads');
        $data['image06'] = $image06->getName();
    } else if (!$image06 && $this->request->getPost('image06') == "") {
        $data['image06'] = "";
    } 

    // Insertion des données
    $success = $model->modifyProduct($data);

    if($success){
        $response = $model->getproduct();
        return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
        // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
    } else {
        $response = ['message' => 'ça n\'a pas marché !!'];
        return $this->response->setJSON($response);
    }
}


    public function getproduct()
    {
        $model = model(ProduitModel::class);
        $response = $model->getproduct();

        return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
        // return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
    }

    public function getoneproduct($id)
    {
        $model = model(ProduitModel::class);
        $response = $model->getoneproduct($id);

        // return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
        return $this->response->setHeader('Access-Control-Allow-Origin', 'https://trade.axel.mg')->setJSON($response);
    }

    public function deleteproduct($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: DELETE, OPTIONS');
        }
        $model = model(ProduitModel::class);
        $model->deleteproduct($id);
        $product = $model->getproduct();
        return $this->response->setJSON($product);
    }
}
