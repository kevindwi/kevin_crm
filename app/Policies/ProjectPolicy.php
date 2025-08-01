<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function create(User $user): bool
    {
        return $user->role === 'sales';
    }

    public function approve(User $user, Project $project): Response
    {
        return ($user->role === 'manager' && $project->status === 'waiting')
                    ? Response::allow()
                    : Response::deny('Anda tidak memiliki izin.');
    }

    public function reject(User $user, Project $project): Response
        {
            return ($user->role === 'manager' && $project->status === 'waiting')
                        ? Response::allow()
                        : Response::deny('Anda tidak memiliki izin untuk menolak proyek.');
        }
}
