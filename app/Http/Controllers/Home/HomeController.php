<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Traits\AppResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{

    use AppResponser;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getUser()
    {
        if (!request()->ajax()) {
            return redirect()->to('/');
        }

        $user = Auth::user();
        $success = true;
        if (empty($user)) {
            $success = false;
        }

        return $this->successResponse(['user' => $user], $success);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


}
