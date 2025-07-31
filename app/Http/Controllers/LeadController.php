<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Lead $leads) {
        return Inertia::render("leads/index", [
            'leads' => $leads->all()
        ]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();

        $validate = $request->validate([
            'name' => 'required|max:255|min:2',
            'email' => 'required|email|unique:leads,email',
            'phone' => 'nullable|max:20',
            'address' => 'nullable|string',
            'notes'      => 'nullable|string|max:255',
        ]);

        $validate['created_by'] = $userId;
        $validate['status'] = "new";

        Lead::query()->create($validate);

        return back()->with('message', 'Lead added successfully');
    }
}
