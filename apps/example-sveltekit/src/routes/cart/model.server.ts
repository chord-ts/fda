import type { Cart, CartItem } from "./types";
import { db } from "$lib/server/repo/db.mock";
import { mockProducts } from "./model.fixtures";

/** Получить корзину */
export async function getCart(): Promise<Cart> {
    const items = await db.table<CartItem & { id: string }>("cart_items").findMany();
    return calculateCart(items);
}

/** Добавить товар в корзину */
export async function addToCart(productId: string, quantity = 1): Promise<Cart> {
    const table = db.table<any>("cart_items");
    const existing = await table.findMany();
    const match = existing.find((i: any) => i.productId === productId);

    if (match) {
        match.quantity += quantity;
        return calculateCart(existing);
    }

    const product = mockProducts.find((p) => p.id === productId);
    if (!product) throw new Error(`Product ${productId} not found`);

    await table.insert({
        id: crypto.randomUUID(),
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
    });

    return calculateCart(await table.findMany());
}

/** Удалить товар из корзины */
export async function removeFromCart(itemId: string): Promise<Cart> {
    const table = db.table<any>("cart_items");
    const existing = await table.findMany();
    const filtered = existing.filter((i: any) => i.id !== itemId);
    (table as any).rows = filtered;
    return calculateCart(filtered);
}

/** Изменить количество товара */
export async function updateQuantity(itemId: string, quantity: number): Promise<Cart> {
    const table = db.table<CartItem & { id: string }>("cart_items");
    const existing = await table.findMany();
    const item = existing.find((i) => i.id === itemId);
    if (!item) throw new Error(`Item ${itemId} not found`);
    item.quantity = Math.max(1, quantity);
    return calculateCart(existing);
}

/** Очистить корзину */
export async function clearCart(): Promise<Cart> {
    const table = db.table<any>("cart_items");
    (table as any).rows = [];
    return { items: [], total: 0, totalCount: 0 };
}

/** Получить каталог товаров */
export async function getCatalog() {
    return mockProducts;
}

function calculateCart(items: (CartItem & { id: string })[]): Cart {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
    return { items, total, totalCount };
}
