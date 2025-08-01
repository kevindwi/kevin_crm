import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import Status from '@/components/status';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

interface Sales {
    name: string;
}

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    created_by: number;
    notes: string;
}

interface Product {
    id: string;
    product_name: string;
    speed: string;
    price: number;
    description: string;
    is_active: boolean;
}

interface Project {
    id: string;
    lead_id: string;
    sales_id: string;
    product_id: string;
    sales: Sales;
    product: Product;
    status: 'waiting' | 'approved' | 'rejected';
    manager_id: number;
    approval_date: Date;
    notes: string;
}

interface ProjectsIndexProps {
    leads: Lead[];
    products: Product[];
    projects: Project[];
    userRole: string;
}

const dateFormat = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function Projects({ projects, leads, products, userRole }: ProjectsIndexProps) {
    const [open, setOpen] = useState(false);
    const [openApprove, setOpenApprove] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        lead_id: '',
        product_id: '',
        rejection_notes: '',
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.error(data);

        post(route('projects.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    const handleApprove = (e: React.MouseEvent<HTMLButtonElement>, projectId: string) => {
        e.preventDefault();
        console.error(data);

        post(route('projects.approve', { project: projectId }), {
            onSuccess: () => {
                setOpenApprove(false);
                reset();
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    const handleReject = (e: React.MouseEvent<HTMLButtonElement>, projectId: string) => {
        e.preventDefault();
        console.error(data);

        post(route('projects.reject', { project: projectId }), {
            onSuccess: () => {
                setOpenApprove(false);
                reset();
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {userRole === 'sales' && (
                    <div>
                        <Dialog
                            open={open}
                            onOpenChange={() => {
                                setOpen(!open);
                                reset();
                            }}
                        >
                            <form>
                                <DialogTrigger asChild>
                                    <Button variant="default">
                                        Add new project <Plus />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="">
                                    <DialogHeader>
                                        <DialogTitle>Add new project</DialogTitle>
                                        <DialogDescription>Add new project here. Click save when you&apos;re done.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Leads Name</Label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
                                                    <div className="flex flex-col gap-1 text-start leading-none">
                                                        <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
                                                            {data.lead_id != ''
                                                                ? leads.find((lead) => lead.id === data.lead_id)?.name
                                                                : 'Choose lead'}
                                                        </span>
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-66">
                                                    {leads.map((lead) => (
                                                        <DropdownMenuItem key={lead.id} onClick={() => setData('lead_id', lead.id)}>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex flex-col gap-1 text-start leading-none">
                                                                    <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
                                                                        {lead.name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {data.lead_id === lead.id && <Check className="ml-auto" />}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            {errors.lead_id && <p className="text-sm text-red-500">{errors.lead_id}</p>}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Products Name</Label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
                                                    <div className="flex flex-col gap-1 text-start leading-none">
                                                        <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
                                                            {errors.product_id != ''
                                                                ? products.find((product) => product.id === errors.product_id)?.product_name
                                                                : 'Choose product'}
                                                        </span>
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-66">
                                                    {products.map((product) => {
                                                        if (product.is_active)
                                                            return (
                                                                <DropdownMenuItem key={product.id} onClick={() => setData('product_id', product.id)}>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex flex-col gap-1 text-start leading-none">
                                                                            <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
                                                                                {product.product_name}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    {data.product_id === product.id && <Check className="ml-auto" />}
                                                                </DropdownMenuItem>
                                                            );
                                                    })}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            {errors.product_id && <p className="text-sm text-red-500">{errors.product_id}</p>}
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" onClick={handleSubmit} disabled={processing}>
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>
                )}

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead className="w-[100px]">Lead Name</TableHead>
                                <TableHead>Sales Name</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead>Approval Date</TableHead>
                                <TableHead>Notes</TableHead>
                                {projects.filter((obj) => obj.status === 'waiting').length > 0 && (
                                    <TableHead className="text-center">Actions</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{leads.find((lead) => lead.id === project.lead_id)?.name}</TableCell>
                                    <TableCell>{project.sales?.name ?? 'N/A'}</TableCell>
                                    <TableCell>{project.product.product_name}</TableCell>
                                    <TableCell>
                                        <Status row={project.status} />
                                    </TableCell>
                                    <TableCell>{project.manager_id ? project.manager_id : '-'}</TableCell>
                                    <TableCell>{project.approval_date ? dateFormat(project.approval_date) : '-'}</TableCell>
                                    <TableCell>{project.notes ? <Textarea className="max-w-sm" value={project.notes} readOnly /> : '-'}</TableCell>
                                    <TableCell>
                                        {/*{userRole === 'sales' && (
                                            <Button size={'sm'} variant={'default'}>
                                                Edit
                                            </Button>
                                        )}*/}

                                        {project.status == 'waiting' && userRole === 'manager' && (
                                            <div className="flex justify-center gap-2">
                                                <Dialog open={openApprove} onOpenChange={() => setOpenApprove(!openApprove)}>
                                                    <form>
                                                        <DialogTrigger asChild>
                                                            <Button size={'sm'} className="bg-green-800 text-white hover:bg-green-700">
                                                                Approve
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Project Approval</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to accept this project? The project will be converted to a
                                                                    customer and the service will be activated.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <Button type="submit" onClick={(e) => handleApprove(e, project.id)}>
                                                                    Save changes
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </form>
                                                </Dialog>
                                                <Dialog open={openReject} onOpenChange={() => setOpenReject(!openReject)}>
                                                    <form>
                                                        <DialogTrigger asChild>
                                                            <Button variant={'destructive'} size={'sm'}>
                                                                Reject
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Project Rejection</DialogTitle>
                                                                <DialogDescription>Are you sure you want to reject this project?</DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4">
                                                                <div className="grid gap-3">
                                                                    <Label htmlFor="notes-1">Add Notes*</Label>
                                                                    <Textarea
                                                                        id="notes-1"
                                                                        name="notes"
                                                                        placeholder="Notes"
                                                                        required
                                                                        onChange={(e) => setData('rejection_notes', e.target.value)}
                                                                    />
                                                                    {errors.rejection_notes && (
                                                                        <p className="text-sm text-red-500">{errors.rejection_notes}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <Button
                                                                    type="submit"
                                                                    variant={'destructive'}
                                                                    onClick={(e) => handleReject(e, project.id)}
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </form>
                                                </Dialog>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
