<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // 1. Lấy danh mục kèm theo sản phẩm đại diện (Eager Loading)
        $categories = Category::with('representativeProduct')->get();

        // 2. Biến đổi dữ liệu (Transform) cho gọn gàng trước khi trả về JSON
        $data = $categories->map(function ($category) {
            // Xử lý link ảnh: Nếu có sản phẩm thì lấy ảnh, không thì dùng ảnh default
            $imagePath = null;
            if ($category->representativeProduct && $category->representativeProduct->image) {
                // Tạo đường dẫn đầy đủ: http://your-domain.com/images/ten-anh.jpg
                $imagePath = $category->representativeProduct->image;
            } else {
                $imagePath = 'default-placeholder.png';
            }

            return [
                'id' => $category->id,
                'name' => $category->categoryname,
                'image' => $imagePath,
                'link' => '/products?category=' . $category->id,
            ];
        });

        // 3. Trả về JSON
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
}
