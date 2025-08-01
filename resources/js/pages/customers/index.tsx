import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

interface ProductDetail {
    id: number;
    product_name: string;
    speed: string;
    price: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface CustomerProductItem {
    id: number;
    customer_id: number;
    product_id: number;
    start_date: string;
    is_active: boolean;
    product: ProductDetail;
}

interface Customer {
    id: number;
    lead_id: number;
    name: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    products: CustomerProductItem[];
}

interface CustomerIndexProps {
    customers: Customer[];
}

function IsActive({ status }: { status: boolean }) {
    return status ? (
        <Badge className="bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
            active
        </Badge>
    ) : (
        <Badge className="bg-destructive-foreground/10 text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/5">
            inactive
        </Badge>
    );
}

export default function Customers({ customers }: CustomerIndexProps) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead className="w-[100px]">Customer Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>
                                        {customer.status == 'active' ? (
                                            <Badge className="bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                                                active
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-destructive-foreground/10 text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/5">
                                                inactive
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Dialog
                                            open={open}
                                            onOpenChange={() => {
                                                setOpen(!open);
                                            }}
                                        >
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button variant="default" size={'sm'}>
                                                        Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="">
                                                    <DialogHeader>
                                                        <DialogTitle>Products details</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="grid gap-4">
                                                        <div className="w-full">
                                                            <div className="[&>div]:max-h-70 [&>div]:rounded-sm [&>div]:border">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow className="sticky top-0 bg-background">
                                                                            <TableHead className="w-25">Product Name</TableHead>
                                                                            <TableHead>Speed</TableHead>
                                                                            <TableHead>Price</TableHead>
                                                                            <TableHead>Start date</TableHead>
                                                                            <TableHead>Status</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {customer.products.map((customerProduct, index) => (
                                                                            <TableRow key={index}>
                                                                                <TableCell>{customerProduct.product.product_name}</TableCell>
                                                                                <TableCell>{customerProduct.product.speed}</TableCell>
                                                                                <TableCell>
                                                                                    {parseFloat(customerProduct.product.price).toLocaleString(
                                                                                        'id-ID',
                                                                                    )}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {new Date(customerProduct.start_date).toLocaleDateString('id-ID')}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <IsActive status={customerProduct.is_active} />
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>
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
