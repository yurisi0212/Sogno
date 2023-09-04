<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller {

    public function index(): Response {
        return Inertia::render('Notification/Index');
    }

}
