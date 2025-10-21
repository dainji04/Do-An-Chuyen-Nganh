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
            'avatarimg' => 'admin-avatar.jpg'
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
                'avatarimg' => 'user' . $i . '-avatar.jpg',
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

        // Tạo Products
        $products = [
            // Laptops
            ['category_id' => $categoryModels[0]->id, 'productname' => 'Dell XPS 15', 'price' => 1500.00, 'discount' => 10, 'quantity' => 50, 'description' => 'Premium laptop for professionals', 'detail' => 'Intel Core i7, 16GB RAM, 512GB SSD', 'guarantee' => '2 years', 'status' => 'active', 'image' => 'dell-xps-15.jpg'],
            ['category_id' => $categoryModels[0]->id, 'productname' => 'MacBook Pro 14', 'price' => 2000.00, 'discount' => 5, 'quantity' => 30, 'description' => 'Apple MacBook Pro with M3 chip', 'detail' => 'M3 chip, 16GB RAM, 512GB SSD', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'macbook-pro-14.jpg'],
            ['category_id' => $categoryModels[0]->id, 'productname' => 'Lenovo ThinkPad X1', 'price' => 1200.00, 'discount' => 15, 'quantity' => 40, 'description' => 'Business laptop with great keyboard', 'detail' => 'Intel Core i5, 8GB RAM, 256GB SSD', 'guarantee' => '3 years', 'status' => 'active', 'image' => 'lenovo-thinkpad-x1.jpg'],
            
            // Smartphones
            ['category_id' => $categoryModels[1]->id, 'productname' => 'iPhone 15 Pro', 'price' => 1200.00, 'discount' => 0, 'quantity' => 100, 'description' => 'Latest iPhone with A17 Pro chip', 'detail' => '256GB, Titanium design, ProMotion display', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'iphone-15-pro.jpg'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Samsung Galaxy S24', 'price' => 900.00, 'discount' => 10, 'quantity' => 80, 'description' => 'Samsung flagship with AI features', 'detail' => '128GB, Snapdragon 8 Gen 3, AMOLED display', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'galaxy-s24.jpg'],
            ['category_id' => $categoryModels[1]->id, 'productname' => 'Google Pixel 8', 'price' => 700.00, 'discount' => 5, 'quantity' => 60, 'description' => 'Pure Android experience with great camera', 'detail' => '128GB, Tensor G3, Best camera', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'pixel-8.jpg'],
            
            // Tablets
            ['category_id' => $categoryModels[2]->id, 'productname' => 'iPad Air', 'price' => 600.00, 'discount' => 0, 'quantity' => 50, 'description' => 'Versatile iPad for work and play', 'detail' => '64GB, M1 chip, 10.9-inch display', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'ipad-air.jpg'],
            ['category_id' => $categoryModels[2]->id, 'productname' => 'Samsung Galaxy Tab S9', 'price' => 500.00, 'discount' => 10, 'quantity' => 45, 'description' => 'Premium Android tablet', 'detail' => '128GB, Snapdragon 8 Gen 2, S Pen included', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'galaxy-tab-s9.jpg'],
            
            // Accessories
            ['category_id' => $categoryModels[3]->id, 'productname' => 'Logitech MX Master 3', 'price' => 100.00, 'discount' => 0, 'quantity' => 200, 'description' => 'Premium wireless mouse', 'detail' => 'Ergonomic design, Multi-device connectivity', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'mx-master-3.jpg'],
            ['category_id' => $categoryModels[3]->id, 'productname' => 'Magic Keyboard', 'price' => 150.00, 'discount' => 5, 'quantity' => 150, 'description' => 'Wireless keyboard for Mac', 'detail' => 'Rechargeable, Bluetooth connectivity', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'magic-keyboard.jpg'],
            ['category_id' => $categoryModels[3]->id, 'productname' => 'USB-C Hub 7-in-1', 'price' => 50.00, 'discount' => 15, 'quantity' => 300, 'description' => 'Multi-port USB-C adapter', 'detail' => 'HDMI, USB 3.0, SD card reader', 'guarantee' => '6 months', 'status' => 'active', 'image' => 'usb-c-hub.jpg'],
            
            // Gaming
            ['category_id' => $categoryModels[4]->id, 'productname' => 'PlayStation 5', 'price' => 500.00, 'discount' => 0, 'quantity' => 70, 'description' => 'Next-gen gaming console', 'detail' => '825GB SSD, 4K gaming, Ray tracing', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'ps5.jpg'],
            ['category_id' => $categoryModels[4]->id, 'productname' => 'Xbox Series X', 'price' => 500.00, 'discount' => 0, 'quantity' => 65, 'description' => 'Microsoft gaming console', 'detail' => '1TB SSD, 4K 120fps, Game Pass', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'xbox-series-x.jpg'],
            
            // Audio
            ['category_id' => $categoryModels[5]->id, 'productname' => 'AirPods Pro 2', 'price' => 250.00, 'discount' => 10, 'quantity' => 150, 'description' => 'Premium wireless earbuds', 'detail' => 'Active noise cancellation, Spatial audio', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'airpods-pro-2.jpg'],
            ['category_id' => $categoryModels[5]->id, 'productname' => 'Sony WH-1000XM5', 'price' => 350.00, 'discount' => 5, 'quantity' => 100, 'description' => 'Best noise-canceling headphones', 'detail' => 'Industry-leading ANC, 30-hour battery', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'sony-wh-1000xm5.jpg'],
            
            // Wearable
            ['category_id' => $categoryModels[6]->id, 'productname' => 'Apple Watch Series 9', 'price' => 400.00, 'discount' => 0, 'quantity' => 90, 'description' => 'Advanced smartwatch', 'detail' => 'S9 chip, Always-on display, Health tracking', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'apple-watch-9.jpg'],
            ['category_id' => $categoryModels[6]->id, 'productname' => 'Samsung Galaxy Watch 6', 'price' => 300.00, 'discount' => 10, 'quantity' => 85, 'description' => 'Feature-rich Android smartwatch', 'detail' => 'Wear OS, Health monitoring, Long battery', 'guarantee' => '1 year', 'status' => 'active', 'image' => 'galaxy-watch-6.jpg']
        ];

        $productModels = [];
        foreach ($products as $product) {
            $productModels[] = Product::create($product);
        }

        // Tạo Images cho products
        foreach ($productModels as $index => $product) {
            // Mỗi sản phẩm có 2-4 ảnh bổ sung
            $numImages = rand(2, 4);
            for ($i = 1; $i <= $numImages; $i++) {
                Image::create([
                    'product_id' => $product->id,
                    'image' => $product->image . '-' . $i . '.jpg'
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
