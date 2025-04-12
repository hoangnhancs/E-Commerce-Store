export type Product = {
    id: string;
    name: string;
    description?: string;
    price: number;
    category: string;
    brand: string,
    quantityInStock: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
};