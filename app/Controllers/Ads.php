<?php
    Namespace App\Controllers;
    Use App\Models\AdsModel;


    class Ads extends BaseController
    {
        public function addAds($data)
        {
            $model = model(AdsModel::class);

            $imagepub = $this->request->getFile('imagepub');

            $data = [
                'userid' => $this->request->getPost('userid'),
                'storeid' => $this->request->getPost('storeid'),
                'texte' => $this->request->getPost('texte'),
                'lien' => $this->request->getPost('lien'),
            ];

            // Validation des fichiers
            if($imagepub && $imagepub->isValid() && !$imagepub->hasModevd()){
                $imagepub->move(WRITEPATH . '../public/uploads');
                $data['imagepub'] = $imagepub->getName();
            }

            $success = $model->addAds($data);

            if($success){
                $response = $model->getAds();
                return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
            } else {
                $response {
                    'message' => 'ça n\'a pas marché !!';
                }
            }

        }

        public function getAds()
        {
            $model = model(AdsModel::class);

            $response = $model-getAds();
            return $this->response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->setJSON($response);
        }
    }
