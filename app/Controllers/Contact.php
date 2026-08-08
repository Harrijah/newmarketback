<?php
namespace App\Controllers;
use App\Models\Contactmodel;
helper(['url', 'form']);

class Contact extends BaseController
{
    public function getcontact()
    {
        $model = model(Contactmodel::class);
        $email = \Config\Services::email();

        if ($this->request->getMethod() == 'post') {
            $validationRules = [
                'nom_societe' => 'required',
                'telephone'   => 'required',
                'email'       => 'required|valid_email',
            ];

            $nom_societe = $this->request->getPost('nom_societe');
            $telephone   = $this->request->getPost('telephone');
            $emailField  = $this->request->getPost('email');
            $ville       = $this->request->getPost('ville');
            $message     = $this->request->getPost('message');

            $data = [
                'nom_societe' => $nom_societe,
                'telephone'   => $telephone,
                'email'       => $emailField,
                'ville'       => $ville,
                'message'     => $message,
            ];

            if ($this->validate($validationRules)) {
                $email->setFrom('site@multifilms-vitres.fr', 'Nouvelle demande de RDV');
                // $email->setTo('contact@multifilms-vitres.fr');
                $email->setTo('andrianarivohari@gmail.com');
                $email->setSubject('Demande de rappel de ' . $data['nom_societe']);
                $email->setMessage(
                    'Nom / Société : ' . $data['nom_societe'] . '
                    Téléphone : '     . $data['telephone']   . '
                    Email : '         . $data['email']       . '
                    Ville : '         . $data['ville']       . '
                    Message : '       . $data['message']
                );
                $email->send();
                $model->getcontact();

                return redirect()->to('https://multifilms-vitres.fr');
            }
        }
    }
}