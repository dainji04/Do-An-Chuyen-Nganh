<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;

class MomoController extends Controller
{
    function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

        $result = curl_exec($ch);
        $curlError = null;
        if ($result === false) {
            $curlError = curl_error($ch);
        }

        // close connection
        curl_close($ch);

        return [
            'success' => $result !== false,
            'result' => $result,
            'error' => $curlError,
        ];
    }

    public function momoPayment(Request $request)
    {
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = "Thanh toán qua MoMo";
        $amountRequest = $request->input('amount');
        $amount = $amountRequest;

        $orderId = time() . "";
        $redirectUrl = "http://localhost:3000/home";
        $ipnUrl = "http://localhost:3000/home";
        $extraData = "";


        $partnerCode = $partnerCode;
        $accessKey = $accessKey;
        $serectkey = $secretKey;
        $orderId = $orderId; // Mã đơn hàng
        $orderInfo = $orderInfo;
        $amount = $amount;
        $ipnUrl = $ipnUrl;
        $redirectUrl = $redirectUrl;
        $extraData = $extraData;

        $requestId = time() . "";
        $requestType = "payWithATM";
        //before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $serectkey);
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $call = $this->execPostRequest($endpoint, json_encode($data));

        $jsonResult = json_decode($call['result'], true);

        $payUrl = $jsonResult['payUrl'];
        return response()->json([
            'payUrl' => $payUrl
        ]);
    }
}
