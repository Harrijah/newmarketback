<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */


$routes->get('/', 'Accueil::index');
$routes->post('/createaccount', 'User::createaccount');
$routes->post('/connectme', 'User::connectme');
$routes->get('/disconnect', 'User::disconnect');
$routes->put('/updateinfo', 'User::updateinfo');
$routes->post('/createnewstore', 'Store::createnewstore');
$routes->get('getstore/(:num)', 'Store::getstore/$1');
$routes->get('/getallstore', 'Store::getallstore');
$routes->put('/updatestoreinfo', 'Store::updatestoreinfo');


$routes->post('/addrayon', 'Rayon::addrayon');
$routes->get('/getrayon', 'Rayon::getrayon');
$routes->post('/addcategorie', 'Categorie::addcategorie');
$routes->get('/getcategorie', 'Categorie::getcategorie');

$routes->get('/getsouscat', 'Souscat::getsouscat');
$routes->post('/addsouscat', 'Souscat::addsouscat');

$routes->get('/getmarque', 'Marque::getmarque');
$routes->post('/addmarque', 'Marque::addmarque');

$routes->post('/addproduct', 'Produit::addproduct');
$routes->get('/getproduct', 'Produit::getproduct');
$routes->get('/getoneproduct/(:num)', 'Produit::getoneproduct/$1');
$routes->delete('/deleteproduct/(:num)', 'Produit::deleteproduct/$1');
$routes->post('/modifyProduct', 'Produit::modifyProduct');

$routes->post('/addcommand', 'Command::addcommand');