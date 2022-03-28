<?php


namespace App\Traits;


trait AppResponser
{

    public function successResponse($data, $success = true)
    {

        $data['success'] = $success;
        return response()->json($data, 200);
    }


    protected function errorResponse($message, $code, $success = false)
    {
        return response()->json(['error' => $message, 'code' => $code, 'success' => $success], 200);
    }
}
