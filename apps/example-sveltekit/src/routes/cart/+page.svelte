<script lang="ts">
    import { cart, isEmpty, formatPrice, addToCart, removeItem, increaseItem, decreaseItem, emptyCart } from "./stores";
    import { mockProducts } from "./model.fixtures";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
    let adding = $state(false);

    $effect(() => {
        cart.set(data.cart);
    });

    async function handleAdd(productId: string) {
        adding = true;
        try {
            await addToCart(productId, 1);
        } finally {
            adding = false;
        }
    }
</script>

<div class="cart-page">
    <header class="cart-header">
        <h1>Корзина</h1>
        <span class="item-count">{$cart.totalCount} шт.</span>
    </header>

    {#if $isEmpty}
        <div class="empty">
            <p>🛒 Корзина пуста</p>
            <p class="hint">Добавьте товары из каталога:</p>
            <div class="catalog-grid">
                {#each mockProducts as product (product.id)}
                    <div class="product-card">
                        <span class="image">{product.image}</span>
                        <div class="details">
                            <div class="name">{product.name}</div>
                            <div class="price">{formatPrice(product.price)}</div>
                        </div>
                        <button disabled={adding} onclick={() => handleAdd(product.id)}>В корзину</button>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <section class="cart-body">
            {#each $cart.items as item (item.id)}
                <div class="cart-item">
                    <span class="image">{item.image}</span>
                    <div class="info">
                        <div class="name">{item.name}</div>
                        <div class="price">{formatPrice(item.price)}</div>
                    </div>
                    <div class="quantity">
                        <button onclick={() => decreaseItem(item.id)}>−</button>
                        <span>{item.quantity}</span>
                        <button onclick={() => increaseItem(item.id)}>+</button>
                    </div>
                    <div class="subtotal">{formatPrice(item.price * item.quantity)}</div>
                    <button class="remove" onclick={() => removeItem(item.id)}>×</button>
                </div>
            {/each}
        </section>

        <footer class="cart-footer">
            <div class="total">
                <span>Итого:</span>
                <strong>{formatPrice($cart.total)}</strong>
            </div>
            <button class="clear" onclick={emptyCart}>Очистить корзину</button>
        </footer>

        <section class="catalog">
            <h2>Каталог</h2>
            <div class="catalog-grid">
                {#each mockProducts as product (product.id)}
                    <div class="product-card">
                        <span class="image">{product.image}</span>
                        <div class="details">
                            <div class="name">{product.name}</div>
                            <div class="price">{formatPrice(product.price)}</div>
                        </div>
                        <button disabled={adding} onclick={() => handleAdd(product.id)}>В корзину</button>
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</div>

<style>
    :global(:root) {
        --border-color: #e0e0e0;
        --secondary-text: #888;
        --accent: #086efd;
    }

    .cart-page {
        max-width: 760px;
        margin: 2rem auto;
        padding: 0 1rem;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid var(--border-color);
        padding-bottom: 0.5rem;
    }

    .cart-header h1 { margin: 0; font-size: 1.6rem; }
    .item-count { color: var(--secondary-text); font-size: 0.9rem; }

    .empty { text-align: center; padding: 2rem 1rem; }
    .empty p { font-size: 1.1rem; margin-bottom: 0.5rem; }
    .hint { font-size: 0.95rem; color: var(--secondary-text); }

    .cart-item {
        display: grid;
        grid-template-columns: auto 1fr auto auto auto;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
    }

    .image { font-size: 2rem; }
    .name { font-weight: 600; }
    .price { color: var(--secondary-text); font-size: 0.85rem; }

    .quantity { display: flex; align-items: center; gap: 0.5rem; }

    .quantity button {
        width: 30px;
        height: 30px;
        border: 1px solid var(--border-color);
        background: transparent;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quantity button:hover { background: var(--border-color); }
    .subtotal { font-weight: 700; min-width: 80px; text-align: right; }

    .remove {
        background: none;
        border: 1px solid transparent;
        color: #e74c3c;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 0.5rem;
        border-radius: 6px;
    }

    .remove:hover {
        background: rgba(231, 76, 60, 0.08);
        border-color: #e74c3c;
    }

    .cart-footer {
        margin-top: 1.5rem;
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .total { font-size: 1.2rem; display: flex; gap: 0.5rem; }

    .clear {
        background: transparent;
        border: 1px solid #e74c3c;
        color: #e74c3c;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.15s;
    }

    .clear:hover { background: rgba(231, 76, 60, 0.08); }

    .catalog h2 { font-size: 1.2rem; margin: 1.5rem 0 1rem; }

    .catalog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
    }

    .product-card {
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        text-align: center;
    }

    .product-card .image { font-size: 2.5rem; }
    .product-card .name { font-weight: 600; font-size: 0.9rem; }
    .product-card .price { color: var(--secondary-text); font-size: 0.8rem; }

    .product-card button {
        margin-top: 0.5rem;
        background: var(--accent);
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.4rem 1rem;
        cursor: pointer;
        font-size: 0.85rem;
        transition: opacity 0.15s;
    }

    .product-card button:hover:not(:disabled) { opacity: 0.85; }
    .product-card button:disabled { cursor: not-allowed; opacity: 0.5; }

    @media (max-width: 520px) {
        .cart-item {
            grid-template-columns: auto 1fr auto;
            gap: 0.5rem;
        }
        .cart-item .quantity { grid-column: 2; justify-content: start; }
        .cart-item .subtotal { grid-column: 1 / 3; text-align: left; font-weight: 500; }
    }
</style>
