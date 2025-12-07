<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Cart;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Email;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo Users
        $admin = User::create([
            'username' => 'admin',
            'fullname' => 'Administrator',
            'email' => 'admin@example.com',
            'numberphone' => '0123456789',
            'address' => '123 Admin Street, HCM City',
            'status' => 'active',
            'role' => 'admin',
            'avatarimage' => 'https://ui-avatars.com/api/?name=Admin&background=random&color=fff',
            'password' => Hash::make('password123'),
        ]);

        $users = [];
        for ($i = 1; $i <= 10; $i++) {
            $users[] = User::create([
                'username' => 'user' . $i,
                'fullname' => 'User Number ' . $i,
                'email' => 'user' . $i . '@example.com',
                'numberphone' => '09' . str_pad($i, 8, '0', STR_PAD_LEFT),
                'address' => $i . ' User Street, District ' . ($i % 12 + 1) . ', HCM City',
                'status' => 'active',
                'role' => 'user',
                'password' => Hash::make('password123'),
                'avatarimage' => 'https://ui-avatars.com/api/?name=' . $i . '&background=random&color=fff',
                'ordernum' => rand(0, 20)
            ]);
        }

        // Tạo Categories
        $categories = [
            ['categoryname' => 'Samsung', 'description' => 'Gã khổng lồ công nghệ Hàn Quốc với hệ sinh thái Galaxy đa dạng'],
            ['categoryname' => 'OPPO', 'description' => 'Thương hiệu smartphone tập trung vào thiết kế và nhiếp ảnh chân dung'],
            ['categoryname' => 'Xiaomi', 'description' => 'Sản phẩm cấu hình cao, giá tốt và hệ sinh thái thông minh'],
            ['categoryname' => 'Google', 'description' => 'Điện thoại Pixel với trải nghiệm Android thuần khiết và AI đỉnh cao'],
            ['categoryname' => 'Sony', 'description' => 'Thương hiệu Nhật Bản với các dòng Xperia chuyên biệt cho giải trí'],
            ['categoryname' => 'ASUS', 'description' => 'Nổi tiếng với dòng ROG Phone chuyên game đỉnh cao'],
            ['categoryname' => 'Realme', 'description' => 'Thương hiệu trẻ trung với các sản phẩm hiệu năng tốt trong tầm giá'],
        ];

        $categoryModels = [];
        foreach ($categories as $category) {
            $categoryModels[] = Category::create($category);
        }

        // Tạo Promotions
        $promotions = [
            [
                'promotionname' => 'Summer Sale',
                'description' => 'Hot summer discount for all products',
                'startdate' => '2025-06-01',
                'enddate' => '2025-08-31',
                'percent' => 15.0,
                'status' => 'active'
            ],
            [
                'promotionname' => 'Black Friday',
                'description' => 'Biggest sale of the year',
                'startdate' => '2025-11-25',
                'enddate' => '2025-11-30',
                'percent' => 30.0,
                'status' => 'active'
            ],
            [
                'promotionname' => 'New Year Sale',
                'description' => 'Welcome new year with great deals',
                'startdate' => '2025-12-25',
                'enddate' => '2026-01-05',
                'percent' => 20.0,
                'status' => 'active'
            ],
            [
                'promotionname' => 'Flash Sale',
                'description' => 'Limited time flash sale',
                'startdate' => '2025-03-01',
                'enddate' => '2025-03-15',
                'percent' => 10.0,
                'status' => 'expired'
            ]
        ];

        $promotionModels = [];
        foreach ($promotions as $promotion) {
            $promotionModels[] = Promotion::create($promotion);
        }

        // Tạo Products (dựa trên ảnh thực tế trong frontend/public)
        $products = [
            // Smartphones - Sản phẩm thực tế có ảnh
            [
                'category_id' => $categoryModels[1]->id,
                'productname' => 'Samsung Galaxy S25 Ultra Xanh',
                'price' => 27990000,
                'discount' => 5,
                'quantity' => 50,
                'description' => 'Samsung Galaxy S25 Ultra phiên bản màu xanh sang trọng với nhiều tính năng AI tiên tiến',
                'detail' => 'Màn hình 6.8"<br/>Dynamic AMOLED 2X<br/>Snapdragon 8 Gen 4<br/>Camera 200MP<br/>Pin 5000mAh<br/>Bút S Pen tích hợp',
                'guarantee' => '12 tháng',
                'status' => 'active',
                'image' => 'galaxy-s25-ultra-xanh.jpg'
            ],
            [
                'category_id' => $categoryModels[1]->id,
                'productname' => 'OPPO Reno14 F 5G Pink',
                'price' => 8990000,
                'discount' => 10,
                'quantity' => 80,
                'description' => 'OPPO Reno14 F màu hồng thời trang với thiết kế mỏng nhẹ và camera chụp chân dung xuất sắc',
                'detail' => 'Màn hình 6.7"<br/>AMOLED 120Hz<br/>MediaTek<br/>Dimensity 6300<br/>Camera 50MP AI<br/>Pin 5000mAh<br/>Sạc nhanh 45W',
                'guarantee' => '12 tháng',
                'status' => 'active',
                'image' => 'oppo-reno14-f-pink.jpg'
            ],
            [
                'category_id' => $categoryModels[1]->id,
                'productname' => 'Samsung Galaxy S25 FE Blue',
                'price' => 16990000,
                'discount' => 8,
                'quantity' => 60,
                'description' => 'Samsung Galaxy S25 FE màu xanh dương với hiệu năng mạnh mẽ và giá cả phải chăng',
                'detail' => 'Màn hình 6.6"<br/>Dynamic AMOLED 2X 120Hz<br/>Exynos 2400e<br/>Camera 50MP OIS<br/>Pin 4500mAh<br/>Sạc nhanh 25W',
                'guarantee' => '12 tháng',
                'status' => 'active',
                'image' => 'samsung-galaxy-s25-fe-blue.jpg'
            ],

            // Các sản phẩm khác (không có ảnh thực tế)
            // Flagship cao cấp
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Samsung Galaxy S24 Ultra', 'price' => 33990000, 'discount' => 5, 'quantity' => 50, 'description' => 'Điện thoại AI tiên tiến nhất với bút S Pen quyền năng', 'detail' => 'Snapdragon 8 Gen 3 for Galaxy, 12GB RAM, 256GB, Camera 200MP, Titanium Frame', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'samsung-s24-ultra.webp'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Xiaomi 14 Ultra', 'price' => 29990000, 'discount' => 0, 'quantity' => 30, 'description' => 'Đỉnh cao nhiếp ảnh di động kết hợp cùng Leica', 'detail' => 'Snapdragon 8 Gen 3, Cảm biến 1 inch, Camera Leica Summilux, 16GB RAM, 512GB', 'guarantee' => '18 tháng', 'status' => 'active', 'image' => 'xiaomi-14-ultra.webp'],

            // Điện thoại gập (Foldable)
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Samsung Galaxy Z Fold 6', 'price' => 41990000, 'discount' => 8, 'quantity' => 20, 'description' => 'Điện thoại gập mở quyền năng, đa nhiệm như PC', 'detail' => 'Màn hình gập 7.6", Snapdragon 8 Gen 3, Galaxy AI, Kháng nước IP48', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'galaxy-z-fold-6.webp'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'OPPO Find N3 Flip', 'price' => 22990000, 'discount' => 10, 'quantity' => 25, 'description' => 'Thiết kế gập vỏ sò thời thượng, camera Hasselblad', 'detail' => 'Dimensity 9200, Màn hình phụ lớn, Camera chuyên nghiệp, Sạc nhanh 44W', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'oppo-find-n3-flip.png'],

            // Dòng Pixel & Sony (Niche/Camera)
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Google Pixel 8 Pro', 'price' => 20500000, 'discount' => 0, 'quantity' => 15, 'description' => 'Trải nghiệm Android thuần khiết và nhiếp ảnh thuật toán đỉnh cao', 'detail' => 'Google Tensor G3, Camera AI Magic Editor, 7 năm cập nhật phần mềm', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'pixel-8-pro.jpg'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Sony Xperia 1 V', 'price' => 28990000, 'discount' => 0, 'quantity' => 10, 'description' => 'Điện thoại dành cho nhà sáng tạo nội dung chuyên nghiệp', 'detail' => 'Màn hình 4K OLED 21:9, Cảm biến Exmor T, Jack 3.5mm, Khe thẻ nhớ SD', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'sony-xperia-1-v.webp'],

            // Gaming Phone
            ['category_id' => $categoryModels[1]->id, 'productname' => 'ASUS ROG Phone 8 Pro', 'price' => 29990000, 'discount' => 0, 'quantity' => 40, 'description' => 'Quái vật hiệu năng dành cho game thủ chuyên nghiệp', 'detail' => 'Snapdragon 8 Gen 3, Màn hình 165Hz, AniMe Vision, AirTrigger, Pin 5500mAh', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'rog-phone-8-pro.webp'],

            // Tầm trung & Cận cao cấp (Mid-range)
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Samsung Galaxy A55 5G', 'price' => 9990000, 'discount' => 5, 'quantity' => 100, 'description' => 'Thiết kế kim loại sang trọng, hiệu năng ổn định', 'detail' => 'Exynos 1480, Màn hình Super AMOLED 120Hz, Camera 50MP, Kháng nước IP67', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'galaxy-a55.jpg'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Xiaomi Redmi Note 13 Pro', 'price' => 7290000, 'discount' => 10, 'quantity' => 120, 'description' => 'Ông vua phân khúc tầm trung với camera 200MP', 'detail' => 'Camera 200MP OIS, Sạc nhanh 67W, Màn hình AMOLED viền siêu mỏng', 'guarantee' => '18 tháng', 'status' => 'active', 'image' => 'redmi-note-13-pro.jpg'],

            // Giá rẻ (Budget)
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Samsung Galaxy A15', 'price' => 4990000, 'discount' => 0, 'quantity' => 150, 'description' => 'Lựa chọn hoàn hảo trong phân khúc phổ thông', 'detail' => 'Màn hình Super AMOLED, Helio G99, Pin 5000mAh, Sạc nhanh 25W', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'galaxy-a15.jpg'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Realme C67', 'price' => 3990000, 'discount' => 5, 'quantity' => 80, 'description' => 'Thiết kế đẹp, camera sắc nét trong tầm giá', 'detail' => 'Snapdragon 685, Camera 108MP, Màn hình 90Hz, Pin 5000mAh', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'realme-c67.webp']
        ];

        $productModels = [];
        foreach ($products as $product) {
            $productModels[] = Product::create($product);
        }

        // Tạo Images cho products (dựa trên ảnh thực tế)
        // 3 sản phẩm đầu có ảnh thực tế
        $realImageProducts = [
            ['product_index' => 0, 'image_count' => 5], // Galaxy S25 Ultra có 5 ảnh phụ
            ['product_index' => 1, 'image_count' => 6], // OPPO Reno14 F có 6 ảnh phụ
            ['product_index' => 2, 'image_count' => 5], // Samsung S25 FE có 5 ảnh phụ
        ];

        foreach ($realImageProducts as $productInfo) {
            $product = $productModels[$productInfo['product_index']];
            $imageBaseName = str_replace('.jpg', '', $product->image);

            for ($i = 1; $i <= $productInfo['image_count']; $i++) {
                Image::create([
                    'product_id' => $product->id,
                    'image' => $imageBaseName . '-' . $i . '.jpg'
                ]);
            }
        }

        // Các sản phẩm còn lại tạo ảnh giả (2-4 ảnh)
        for ($index = 3; $index < count($productModels); $index++) {
            $product = $productModels[$index];
            $numImages = rand(2, 4);
            $imageBaseName = str_replace('.jpg', '', $product->image);

            for ($i = 1; $i <= $numImages; $i++) {
                Image::create([
                    'product_id' => $product->id,
                    'image' => $imageBaseName . '-' . $i . '.jpg'
                ]);
            }
        }

        // Tạo Comments
        foreach ($users as $user) {
            // Mỗi user comment cho 2-5 sản phẩm ngẫu nhiên
            $numComments = rand(2, 5);
            $randomProducts = collect($productModels)->random(min($numComments, count($productModels)));

            foreach ($randomProducts as $product) {
                Comment::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'content' => 'This is a great product! I really love it. Highly recommended.',
                    'rate' => rand(3, 5)
                ]);
            }
        }

        // Tạo Carts
        foreach (array_slice($users, 0, 5) as $user) {
            // 5 user đầu có giỏ hàng
            $numItems = rand(1, 4);
            $randomProducts = collect($productModels)->random(min($numItems, count($productModels)));

            foreach ($randomProducts as $product) {
                Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => rand(1, 3)
                ]);
            }
        }

        // Tạo Orders
        foreach ($users as $index => $user) {
            // Mỗi user có 1-3 đơn hàng
            $numOrders = rand(1, 3);

            for ($o = 0; $o < $numOrders; $o++) {
                $statuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
                $paymentStatuses = ['unpaid', 'paid', 'refunded', 'failed'];

                $order = Order::create([
                    'user_id' => $user->id,
                    'total' => 0, // Sẽ cập nhật sau
                    'promotion_id' => rand(0, 1) ? $promotionModels[rand(0, count($promotionModels) - 1)]->id : null,
                    'note' => rand(0, 1) ? 'Please deliver after 5 PM' : null,
                    'process' => $statuses[rand(0, count($statuses) - 1)],
                    'status' => $paymentStatuses[rand(0, count($paymentStatuses) - 1)],
                    'address' => $user->address
                ]);

                // Tạo Order Details
                $numProducts = rand(1, 4);
                $randomProducts = collect($productModels)->random(min($numProducts, count($productModels)));
                $orderTotal = 0;

                foreach ($randomProducts as $product) {
                    $quantity = rand(1, 3);
                    $price = $product->price * (1 - $product->discount / 100);
                    $total = $price * $quantity;
                    $orderTotal += $total;

                    OrderDetail::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $price,
                        'total' => $total
                    ]);
                }

                // Cập nhật total cho order
                $order->update(['total' => $orderTotal]);
            }
        }

        // Tạo Emails
        foreach ($users as $index => $user) {
            if ($index < 7) {
                // 7 user đầu gửi email
                Email::create([
                    'user_id' => $user->id,
                    'name' => $user->fullname,
                    'email' => $user->email,
                    'message' => 'I have a question about my order. Can you help me?'
                ]);
            }
        }

        echo "Database seeded successfully!\n";
        echo "Created:\n";
        echo "- " . User::count() . " users\n";
        echo "- " . Category::count() . " categories\n";
        echo "- " . Product::count() . " products\n";
        echo "- " . Promotion::count() . " promotions\n";
        echo "- " . Order::count() . " orders\n";
        echo "- " . OrderDetail::count() . " order details\n";
        echo "- " . Cart::count() . " cart items\n";
        echo "- " . Comment::count() . " comments\n";
        echo "- " . Image::count() . " images\n";
        echo "- " . Email::count() . " emails\n";
    }
}
