<?php
    Namespace App\Controllers;

    class Accueil extends BaseController
    {
        public function index()
        {
            return redirect()->to('https://trade.axel.mg');
        }

    }