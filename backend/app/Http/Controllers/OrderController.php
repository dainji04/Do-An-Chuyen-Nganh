<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Create a new order and clear cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'total' => 'required|numeric|min:0',
            'address' => 'required|string|max:255',
            'note' => 'nullable|string',
            'promotion_id' => 'nullable|exists:promotions,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $userId = $request->user()->id;

        try {
            DB::beginTransaction();

            // Create order
            $order = Order::create([
                'user_id' => $userId,
                'total' => $request->total,
                'promotion_id' => $request->promotion_id,
                'note' => $request->note,
                'address' => $request->address,
                'process' => 'pending', // pending, processing, shipped, delivered, cancelled
                'status' => 'unpaid', // unpaid, paid
            ]);

            // Create order details and collect product IDs to remove from cart
            $productIdsToRemove = [];
            foreach ($request->items as $item) {
                Orderdetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $item['price'] * $item['quantity'],
                ]);

                // Collect product IDs to remove from cart
                $productIdsToRemove[] = $item['product_id'];
            }

            // Only remove selected items from cart (not entire cart)
            Cart::where('user_id', $userId)
                ->whereIn('product_id', $productIdsToRemove)
                ->delete();

            DB::commit();

            return response()->json([
                'message' => 'Đặt hàng thành công',
                'order' => $order,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Đặt hàng thất bại',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get order history for authenticated user
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $orders = Order::where('user_id', $userId)
            ->with(['orderdetails.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($orders);
    }

    /**
     * Get order detail by ID
     */
    public function show(Request $request, $id)
    {
        $userId = $request->user()->id;

        $order = Order::where('id', $id)
            ->where('user_id', $userId)
            ->with(['orderdetails.product', 'promotion'])
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Không tìm thấy đơn hàng',
            ], 404);
        }

        return response()->json($order);
    }

    /**
     * Update order status after payment
     */
    public function updatePaymentStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:paid,unpaid',
        ]);

        $userId = $request->user()->id;

        $order = Order::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Không tìm thấy đơn hàng',
            ], 404);
        }

        $order->update([
            'status' => $request->status,
            'process' => $request->status === 'paid' ? 'processing' : 'pending',
        ]);

        return response()->json([
            'message' => 'Cập nhật trạng thái thanh toán thành công',
            'order' => $order,
        ]);
    }
}
