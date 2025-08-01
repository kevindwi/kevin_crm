import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
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
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    product_name: string;
    speed: string;
    price: number;
    description: string;
    is_active: boolean;
}

interface ProductIndexProps {
    products: Product[];
}

export default function Products({ products }: ProductIndexProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        product_name: '',
        speed: '',
        price: '',
        description: '',
        is_active: '',
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
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
                                    Add new product <Plus />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="">
                                <DialogHeader>
                                    <DialogTitle>Add new product</DialogTitle>
                                    <DialogDescription>Add new product here. Click save when you&apos;re done.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">Product Name</Label>
                                        <Input
                                            id="product-name-1"
                                            name="product-name"
                                            placeholder="Internet cepat"
                                            value={data.product_name}
                                            onChange={(e) => setData('product_name', e.target.value)}
                                        />
                                        {errors.product_name && <p className="text-sm text-red-500">{errors.product_name}</p>}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="speed-1">Speed</Label>
                                        <Input
                                            id="speed-1"
                                            name="speed"
                                            placeholder="10 Mbps"
                                            value={data.speed}
                                            onChange={(e) => setData('speed', e.target.value)}
                                        />
                                        {errors.speed && <p className="text-sm text-red-500">{errors.speed}</p>}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="price-1">Price</Label>
                                        <Input
                                            id="price-1"
                                            name="price"
                                            placeholder="50000"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                        />
                                        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="description-1">Description</Label>
                                        <Textarea
                                            id="description-1"
                                            name="description"
                                            placeholder="Add description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
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
                                <TableHead className="w-[100px]">Product Name</TableHead>
                                <TableHead>Speed</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{product.product_name}</TableCell>
                                    <TableCell>{product.speed}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        {product.is_active ? (
                                            <Badge className="bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                                                active
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-destructive-foreground/10 text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/5">
                                                inactive
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-center">
                                        <Button size={'sm'}>Edit</Button>
                                        <Button size={'sm'} variant={'destructive'} className="ml-2">
                                            Delete
                                        </Button>
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
