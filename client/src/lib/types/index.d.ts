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

export type Basket = {
    id: string;
    userId: string;
    items: Item[];
}

export type Item = {
    productId: string;
    productName: string;
    imageUrl: string;
    quantity: number;
    price: number;
    brand: string;
    category: string;
}

export type User = {
    Id: string ;
    Email: string;
    DisplayName: string;
    ImageUrl: string;
    TotalSpent: number;
}
    