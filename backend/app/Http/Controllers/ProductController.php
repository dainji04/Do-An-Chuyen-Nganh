<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function getAllProducts() {
        $products = DB::table('products')->simplePaginate(5);
        return response()->json($products);
    }
}
