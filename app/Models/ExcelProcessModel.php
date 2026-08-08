<?php

namespace App\Models;

use CodeIgniter\Model;

class ExcelProcessorModel extends Model
{
    // Vous pouvez gérer les interactions avec la base de données ici si nécessaire
    protected $table = 'excel_data';
    protected $primaryKey = 'id';
    protected $allowedFields = ['column1', 'column2', 'column3'];
}
