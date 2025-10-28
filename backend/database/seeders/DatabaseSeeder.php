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
            'password' => Hash::make('password123'),
            'avatarimage' => 'admin-avatar.jpg'
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
            ['categoryname' => 'Laptop', 'description' => 'Laptops and notebooks for work and gaming'],
            ['categoryname' => 'Smartphone', 'description' => 'Mobile phones and smartphones'],
            ['categoryname' => 'Tablet', 'description' => 'Tablets and iPad devices'],
            ['categoryname' => 'Accessories', 'description' => 'Computer and phone accessories'],
            ['categoryname' => 'Gaming', 'description' => 'Gaming consoles and accessories'],
            ['categoryname' => 'Audio', 'description' => 'Headphones, speakers and audio devices'],
            ['categoryname' => 'Wearable', 'description' => 'Smartwatches and wearable technology']
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
            ['category_id' => $categoryModels[0]->id, 'productname' => 'Dell XPS 15', 'price' => 35000000, 'discount' => 10, 'quantity' => 30, 'description' => 'Laptop cao cấp cho doanh nhân và nhà sáng tạo nội dung', 'detail' => 'Intel Core i7-13700H, 16GB RAM, 512GB SSD, RTX 4050, Màn hình 15.6" FHD+', 'guarantee' => '24 tháng', 'status' => 'active', 'image' => 'dell-xps-15.jpg'],
            ['category_id' => $categoryModels[0]->id, 'productname' => 'MacBook Pro 14', 'price' => 52000000, 'discount' => 5, 'quantity' => 25, 'description' => 'MacBook Pro 14 inch với chip M3 Pro mạnh mẽ', 'detail' => 'Apple M3 Pro, 18GB RAM, 512GB SSD, Màn hình Liquid Retina XDR 14.2"', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'macbook-pro-14.jpg'],

            ['category_id' => $categoryModels[2]->id, 'productname' => 'iPad Air M2', 'price' => 16000000, 'discount' => 0, 'quantity' => 40, 'description' => 'iPad Air với chip M2 mạnh mẽ, lý tưởng cho công việc và giải trí', 'detail' => 'Chip M2, 128GB, Màn hình Liquid Retina 10.9", Hỗ trợ Apple Pencil', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'ipad-air-m2.jpg'],
            ['category_id' => $categoryModels[2]->id, 'productname' => 'Samsung Galaxy Tab S9', 'price' => 13000000, 'discount' => 10, 'quantity' => 35, 'description' => 'Máy tính bảng Android cao cấp kèm bút S Pen', 'detail' => '128GB, Snapdragon 8 Gen 2, Màn hình 11" Dynamic AMOLED 2X, S Pen đi kèm', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'galaxy-tab-s9.jpg'],

            ['category_id' => $categoryModels[3]->id, 'productname' => 'AirPods Pro 2', 'price' => 6500000, 'discount' => 10, 'quantity' => 100, 'description' => 'Tai nghe không dây cao cấp với chống ồn chủ động', 'detail' => 'Chip H2, Chống ồn chủ động, Âm thanh không gian, Chống nước IPX4', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'airpods-pro-2.jpg'],
            ['category_id' => $categoryModels[3]->id, 'productname' => 'Logitech MX Master 3S', 'price' => 2500000, 'discount' => 0, 'quantity' => 150, 'description' => 'Chuột không dây cao cấp cho năng suất tối đa', 'detail' => 'Cảm biến 8000 DPI, Kết nối đa thiết bị, Pin 70 ngày, Cuộn im lặng', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'logitech-mx-master-3s.jpg'],

            ['category_id' => $categoryModels[4]->id, 'productname' => 'PlayStation 5 Slim', 'price' => 13000000, 'discount' => 0, 'quantity' => 50, 'description' => 'Máy chơi game thế hệ mới với hiệu năng vượt trội', 'detail' => '1TB SSD, Ray Tracing, 4K 120fps, Hỗ trợ VR', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'ps5-slim.jpg'],
            ['category_id' => $categoryModels[4]->id, 'productname' => 'Xbox Series X', 'price' => 13500000, 'discount' => 0, 'quantity' => 45, 'description' => 'Console gaming mạnh mẽ từ Microsoft', 'detail' => '1TB SSD, 4K 120fps, Ray Tracing, Game Pass', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'xbox-series-x.jpg'],

            ['category_id' => $categoryModels[5]->id, 'productname' => 'Sony WH-1000XM5', 'price' => 8500000, 'discount' => 5, 'quantity' => 70, 'description' => 'Tai nghe chống ồn tốt nhất thị trường', 'detail' => 'Chống ồn hàng đầu, Pin 30 giờ, LDAC, Multipoint', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'sony-wh-1000xm5.jpg'],
            ['category_id' => $categoryModels[5]->id, 'productname' => 'Bose QuietComfort Ultra', 'price' => 9500000, 'discount' => 8, 'quantity' => 60, 'description' => 'Tai nghe cao cấp với âm thanh không gian', 'detail' => 'Immersive Audio, Chống ồn CustomTune, Pin 24 giờ', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'bose-qc-ultra.jpg'],

            ['category_id' => $categoryModels[6]->id, 'productname' => 'Apple Watch Series 9', 'price' => 10500000, 'discount' => 0, 'quantity' => 80, 'description' => 'Đồng hồ thông minh cao cấp từ Apple', 'detail' => 'Chip S9, Màn hình Always-On, Theo dõi sức khỏe toàn diện, WatchOS 10', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'apple-watch-series-9.jpg'],
            ['category_id' => $categoryModels[6]->id, 'productname' => 'Samsung Galaxy Watch 6', 'price' => 7500000, 'discount' => 10, 'quantity' => 75, 'description' => 'Smartwatch Android với nhiều tính năng sức khỏe', 'detail' => 'Wear OS, Theo dõi giấc ngủ, ECG, Đo thành phần cơ thể', 'guarantee' => '12 tháng', 'status' => 'active', 'image' => 'galaxy-watch-6.jpg']
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
