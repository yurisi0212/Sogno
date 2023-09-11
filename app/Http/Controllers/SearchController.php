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
        $latest = $this->searchService->getSearchHistories(Auth::id());
        if (isset($keyword)) {

        }
        return Inertia::render('Search/Index', [
            "keyword" => $keyword,
            "history" => $latest,
        ]);
    }


}
