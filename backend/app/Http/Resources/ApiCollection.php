<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ApiCollection extends ResourceCollection
{
    public function __construct($resource, string $resourceClass)
    {
        $this->collects = $resourceClass;

        parent::__construct($resource);
    }

    public function with(Request $request): array
    {
        return ['success' => true];
    }
}
