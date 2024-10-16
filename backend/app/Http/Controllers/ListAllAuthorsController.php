<?php

namespace App\Http\Controllers;

use App\Models\Authors;
use Illuminate\Http\Request;

class ListAllAuthorsController extends Controller
{

    public function __invoke()
    {
        return Authors::all();
    }


}
