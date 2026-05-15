import type { Cart } from "./types";

export async function addToCart(productId: string, quantity = 1): Promise<Cart> {
    const res = await fetch("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", productId, quantity }),
    });
    return res.json();
}

export async function removeFromCart(itemId: string): Promise<Cart> {
    const res = await fetch("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", itemId }),
    });
    return res.json();
}

export async function updateQuantity(itemId: string, quantity: number): Promise<Cart> {
    const res = await fetch("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", itemId, quantity }),
    });
    return res.json();
}

export async function clearCart(): Promise<Cart> {
    const res = await fetch("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
    });
    return res.json();
}

export async function loadCart(): Promise<Cart> {
    const res = await fetch("/cart");
    return res.json();
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    }).format(price);
}
