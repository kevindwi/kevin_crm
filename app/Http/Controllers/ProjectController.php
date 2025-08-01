<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerProduct;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Project;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $user->role === 'manager'
            ? $projects = Project::with('product', 'sales')->get()
            : $projects = Project::where('sales_id', $user->id)->with('product', 'sales')->get();

        return Inertia::render("projects/index", [
            'leads' => Lead::query()->select('id', 'name')->get(),
            'products' => Product::query()->select('id', 'product_name', 'is_active')->get(),
            'projects' => $projects,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();

        $validate = $request->validate([
            'lead_id' => 'required',
            'product_id' => 'required',
        ]);

        $validate['sales_id'] = $userId;
        $validate['status'] = "waiting";

        Project::query()->create($validate);

        return back()->with('message', 'Project added successfully');
    }


    public function approve(Request $request, Project $project)
    {
        $this->authorize('approve', $project);

        DB::transaction(function () use ($project) {
            $project->update([
                'status' => 'approved',
                'manager_id' => Auth::id(),
                'approval_date' => now(),
            ]);

            $lead = $project->lead;
            if ($lead) {
                $customer = Customer::firstOrCreate(
                    ['email' => $lead->email],
                    [
                        'lead_id' => $lead->id,
                        'name' => $lead->name,
                        'phone' => $lead->phone,
                        'address' => $lead->address,
                        'status' => 'active',
                    ]
                );

                CustomerProduct::firstOrCreate(
                    [
                        'customer_id' => $customer->id,
                        'product_id' => $project->product_id,
                    ],
                    [
                        'start_date' => now(),
                        'is_active' => true,
                    ]
                );
            }
        });

        return back()->with('message', 'Project approved successfully.');
    }

    public function reject(Request $request, Project $project)
    {
        $this->authorize('reject', $project);

        $request->validate([
            'rejection_notes' => 'required|string|min:10',
        ]);

        $project->update([
            'status' => 'rejected',
            'manager_id' => Auth::id(),
            'notes' => $project->notes . "Rejected by Manager (" . Auth::user()->name . ") on " . now()->format('Y-m-d H:i') . ": " . $request->rejection_notes,
            'approval_date' => now(),
        ]);

        return back()->with('message', 'Project rejected successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
