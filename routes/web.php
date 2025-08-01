<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::redirect('/dashboard', '/leads');

    /* Leads */
    Route::get('leads', [LeadController::class, 'index'])->name('leads.index');
    Route::post('leads', [LeadController::class, 'store'])->name('leads.store');

    /* Products */
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');

    /* Projects */
    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');

    /* Approve */
    Route::post('projects/{project}/approve', [ProjectController::class, 'approve'])->name('projects.approve');
    /* Reject */
    Route::post('projects/{project}/reject', [ProjectController::class, 'reject'])->name('projects.reject');

    /* Customers */
    Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
