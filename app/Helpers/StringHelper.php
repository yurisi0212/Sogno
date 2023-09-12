<?php

if (! function_exists('extractKeywords')) {
    function extractKeywords(string $input, int $limit = -1): array {
        return preg_split('/[\p{Z}\p{Cc}]++/u', $input, $limit, PREG_SPLIT_NO_EMPTY);
    }
}
