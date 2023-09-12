<?php

namespace App\Http\Controllers;

use App\Services\SearchService;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller {

    public function __construct(private SearchService $searchService) {
    }

    public function index(Request $request): Response {
        $keyword = $request->input("q") ?? '';
        $user_id = Auth::id();
        $latest = $this->searchService->getSearchHistories($user_id);
        if (isset($keyword)) {
            $this->searchService->registerSearchHistory($user_id, $keyword);
        }
        return Inertia::render('Search/Index', [
            "keyword" => $keyword,
            "history" => $latest,
        ]);
    }


}
