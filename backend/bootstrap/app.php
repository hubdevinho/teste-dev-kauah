<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $erro = function (string $message, int $status, array $errors = []) {
            $payload = [
                'success' => false,
                'message' => $message,
            ];

            if ($errors !== []) {
                $payload['errors'] = $errors;
            }

            return response()->json($payload, $status);
        };

        $exceptions->render(function (ValidationException $e) use ($erro) {
            return $erro('Os dados enviados são inválidos.', 422, $e->errors());
        });

        $exceptions->render(function (ModelNotFoundException|NotFoundHttpException $e) use ($erro) {
            return $erro('Recurso não encontrado.', 404);
        });

        $exceptions->render(function (Throwable $e) use ($erro) {
            return $erro('Ocorreu um erro interno.', 500);
        });
    })->create();
