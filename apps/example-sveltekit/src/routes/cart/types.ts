export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    totalCount: number;
}
