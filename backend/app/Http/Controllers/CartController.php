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
            )->paginate(3);

        return response()->json([
            'cartItems' => $cartItems,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->user()->id;
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity') ?? 1;

        $cartQuery = Cart::where('user_id', $userId)
            ->where('product_id', $productId);

        $updatedRows = $cartQuery->update([
            'quantity' => DB::raw("quantity + " . ($quantity))
        ]);

        if ($updatedRows == 0) {
            $item = Cart::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        } else {
            // is existing
            $item = $cartQuery->first();
        }

        $totalCartItems = Cart::where('user_id', $userId)->count();

        return response()->json([
            'message'    => 'Đã xử lý giỏ hàng thành công',
            'cartItem'  => $item,
            'cartCount' => $totalCartItems,
        ], 200);
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
    public function destroy(Request $request, string $id)
    {
        $userId = $request->user()->id;
        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $id)
            ->first();
        if (!$cartItem) {
            return response()->json([
                'message' => 'Sản phẩm không tồn tại trong giỏ hàng',
            ], 404);
        } else {
            Cart::where('user_id', $userId)
                ->where('product_id', $id)
                ->delete();
            $totalCartItems = Cart::where('user_id', $userId)->count();

            return response()->json([
                'message'    => 'Đã xóa sản phẩm khỏi giỏ hàng',
                'cartCount' => $totalCartItems,
            ], 200);
        }
    }

    public function clearCart(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        Cart::where('user_id', $userId)->delete();

        return response()->json([
            'message' => 'Đã xóa tất cả sản phẩm trong giỏ hàng',
            'cartCount' => 0,
        ], 200);
    }
}
