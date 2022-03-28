<?php

namespace App\Exceptions;

use App\Traits\AppResponser;
use Asm89\Stack\CorsService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{

    use AppResponser;

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /*-----------------------------------------------------------------------
     * Exception Report or loging.
     *-----------------------------------------------------------------
     | I used this section to build my exception.
     | Doing it this way makes it easier to
     | send my execption to sentry or
     | Bugnag which can be connected
     | to slack for me to know
     | something is wrong.
     |
     | @param \Exception $exception
     | @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    public function render($request, Throwable $e)
    {


        $response = $this->handleException($request, $e);

        app(CorsService::class)->addActualRequestHeaders($response, $request);

        return $response;
    }

    public function handleException($request, Throwable $exception)
    {
        if ($exception instanceof ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }

        if ($exception instanceof ModelNotFoundException) {
            $modelName = strtolower(class_basename($exception->getModel()));

            return $this->errorResponse("Does not exists any {$modelName} with the specified identificator", 404);
        }

        if ($exception instanceof AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        }

        if ($exception instanceof AuthorizationException) {
            return $this->errorResponse($exception->getMessage(), 403);
        }

        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->errorResponse('The specified method for the request is invalid', 405);
        }

        if ($exception instanceof NotFoundHttpException) {
            return $this->errorResponse('The specified URL cannot be found', 404);
        }

        if ($exception instanceof HttpException) {
            return $this->errorResponse($exception->getMessage(), $exception->getStatusCode());
        }

        if ($exception instanceof QueryException) {
            $errorCode = $exception->errorInfo[1];

            if ($errorCode == 1451) {
                return $this->errorResponse('Cannot remove this resource permanently. It is related with any other resource', 409, false);
            } else {
                return $this->errorResponse($exception->getMessage(), $exception->getCode());
            }
        }

        if ($exception instanceof TokenMismatchException) {

            return $this->errorResponse('CSRF token mismatch.', 419, false);
        }


        if (config('app.debug')) {
            return parent::render($request, $exception);
        }
        return $this->errorResponse('Unexpected Exception. Try later', 500, false);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($this->isFrontend($request)) {
            return redirect()->guest('login');
        }

        return $this->errorResponse('Unauthenticated.', 401, false);
    }

    protected function convertValidationExceptionToResponse(ValidationException $e, $request)
    {
        $errors = $e->validator->errors()->getMessages();

        if ($this->isFrontend($request)) {
            return $request->ajax() ? $this->errorResponse($errors, 422, false) : redirect()
                ->back()
                ->withInput($request->input())
                ->withErrors($errors);
        }

        return $this->errorResponse($errors, 422, false);
    }

    private function isFrontend($request)
    {
        return $request->acceptsHtml() && collect($request->route()->middleware())->contains('web');
    }
}
