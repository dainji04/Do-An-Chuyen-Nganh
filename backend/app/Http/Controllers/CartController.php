<?php

namespace App\Http\Controllers;

use App\Models\Cart;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\JsonResponse;

class cartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user()->id;

        $cartItems = DB::table('carts')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('user_id', $user)
            ->select(
                'id',
                'product_id',
                'carts.quantity as quantity',
                'products.productname as name',
                'products.price',
                'products.image',
                'products.description'
            )
            ->get();

        return response()->json([
            'cartCount' => $cartItems->count(),
            'cartItems' => $cartItems,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
