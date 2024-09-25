<?php
    Namespace App\Controllers;

    class Accueil extends BaseController
    {
        public function index()
        {
            return redirect()->to('http://localhost:3000');
        }

    }