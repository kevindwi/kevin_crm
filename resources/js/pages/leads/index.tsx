import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leads',
        href: '/leads',
    },
];

interface Lead {
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    created_by: number;
    notes: string;
}

interface LeadIndexProps {
    leads: Lead[];
}

export default function Leads({ leads }: LeadIndexProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({ name: '', email: '', phone: '', address: '', notes: '' });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post(route('leads.store'), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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
                                    Add new lead <Plus />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="">
                                <DialogHeader>
                                    <DialogTitle>Add new lead</DialogTitle>
                                    <DialogDescription>Add new lead here. Click save when you&apos;re done.</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">Name</Label>
                                        <Input
                                            id="name-1"
                                            name="name"
                                            placeholder="John Doe"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email-1">Email</Label>
                                        <Input
                                            id="email-1"
                                            name="email"
                                            placeholder="example@email.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="phone-1">Phone</Label>
                                        <Input
                                            id="phone-1"
                                            name="phone"
                                            placeholder="0812345678"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="address-1">Address</Label>
                                        <Input
                                            id="address-1"
                                            name="address"
                                            placeholder="Surabaya"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                        />
                                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                    </div>
                                    <div className="col-span-2 grid gap-3">
                                        <Label htmlFor="notes-1">Notes</Label>
                                        <Textarea
                                            id="notes-1"
                                            name="notes"
                                            placeholder="Add notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                        />
                                        {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
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

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assigned to</TableHead>
                                <TableHead>Notes</TableHead>
                                {/*<TableHead className="text-center">Actions</TableHead>*/}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell>{lead.phone}</TableCell>
                                    <TableCell>{lead.address}</TableCell>
                                    <TableCell>{lead.status}</TableCell>
                                    <TableCell>{lead.created_by}</TableCell>
                                    <TableCell>{lead.notes}</TableCell>
                                    {/*<TableCell className="text-center">
                                        <Button size={'sm'}>Edit</Button>
                                        <Button size={'sm'} variant={'destructive'} className="ml-2">
                                            Delete
                                        </Button>
                                    </TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
