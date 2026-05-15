import { writable, derived, type Writable } from "svelte/store";
import * as client from "./client";
import type { Cart } from "./types";

export const cart: Writable<Cart> = writable({ items: [], total: 0, totalCount: 0 });
export const loading = writable(false);
export const error: Writable<string | null> = writable(null);
export const isEmpty = derived(cart, ($cart) => $cart.items.length === 0);

export async function addToCart(productId: string, quantity = 1) {
    loading.set(true);
    error.set(null);
    try {
        const updated = await client.addToCart(productId, quantity);
        cart.set(updated);
    } catch (e) {
        error.set(e instanceof Error ? e.message : "Failed to add item");
    } finally {
        loading.set(false);
    }
}

export async function increaseItem(itemId: string) {
    loading.set(true);
    try {
        const current = getCartFromStore();
        const item = current.items.find((i) => i.id === itemId);
        if (!item) return;
        const updated = await client.updateQuantity(itemId, item.quantity + 1);
        cart.set(updated);
    } catch (e) {
        error.set(e instanceof Error ? e.message : "Failed to update");
    } finally {
        loading.set(false);
    }
}

export async function decreaseItem(itemId: string) {
    loading.set(true);
    try {
        const current = getCartFromStore();
        const item = current.items.find((i) => i.id === itemId);
        if (!item || item.quantity <= 1) {
            const updated = await client.removeFromCart(itemId);
            cart.set(updated);
            return;
        }
        const updated = await client.updateQuantity(itemId, item.quantity - 1);
        cart.set(updated);
    } catch (e) {
        error.set(e instanceof Error ? e.message : "Failed to update");
    } finally {
        loading.set(false);
    }
}

export async function removeItem(itemId: string) {
    loading.set(true);
    try {
        const updated = await client.removeFromCart(itemId);
        cart.set(updated);
    } catch (e) {
        error.set(e instanceof Error ? e.message : "Failed to remove");
    } finally {
        loading.set(false);
    }
}

export async function emptyCart() {
    loading.set(true);
    try {
        const updated = await client.clearCart();
        cart.set(updated);
    } catch (e) {
        error.set(e instanceof Error ? e.message : "Failed to clear");
    } finally {
        loading.set(false);
    }
}

export { formatPrice } from "./client";

function getCartFromStore(): Cart {
    let value: Cart;
    const unsubscribe = cart.subscribe((v) => (value = v))();
    return value!;
}
