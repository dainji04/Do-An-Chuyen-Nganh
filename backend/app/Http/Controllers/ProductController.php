<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function getAllProducts(Request $request)
    {
        $query = DB::table('products');
        $cateId = null;
        // Filter by category if provided
        if ($request->has('category')) {
            $cateId = Category::where('categoryname', $request->category)->value('id');
            if ($cateId) {
                $query->where('category_id', $cateId);
            } else {
                return response()->json([], 200); // No products if category doesn't exist
            }
        }

        $products = $cateId ? $query->simplePaginate(4) : $query->simplePaginate(8);
        return response()->json($products);
    }

    public function getProductById($id)
    {
        $product = Product::with('images')->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function searchProducts(Request $request)
    {
        $keyword = $request->input('keyword', '');
        $products = Product::where('productname', 'LIKE', '%' . $keyword . '%')
            ->orWhere("description", 'LIKE', '%' . $keyword . '%')
            ->orWhere('detail', 'LIKE', '%' . $keyword . '%')
            ->simplePaginate(8);
        return response()->json($products);
    }
}
