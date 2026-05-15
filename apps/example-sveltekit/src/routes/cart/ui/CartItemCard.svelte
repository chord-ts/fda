<script lang="ts">
    import type { CartItem } from "../types";
    import { formatPrice, decreaseItem, increaseItem, removeItem } from "../stores";

    let { item }: { item: CartItem } = $props();

    let removing = $state(false);

    function onRemove() {
        removing = true;
        removeItem(item.id);
    }
</script>

<div class="cart-item" class:selected={removing}>
    <span class="image">{item.image}</span>
    <div class="info">
        <div class="name">{item.name}</div>
        <div class="price">{formatPrice(item.price)}</div>
    </div>
    <div class="quantity">
        <button onclick={decreaseItem.bind(null, item.id)}>−</button>
        <span>{item.quantity}</span>
        <button onclick={increaseItem.bind(null, item.id)}>+</button>
    </div>
    <div class="subtotal">{formatPrice(item.price * item.quantity)}</div>
    <button class="remove" onclick={onRemove}>×</button>
</div>

<style>
    .cart-item {
        display: grid;
        grid-template-columns: auto 1fr auto auto auto;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        border-bottom: 1px solid var(--border-color);
        transition: opacity 0.2s;
    }

    .image {
        font-size: 2rem;
    }

    .name {
        font-weight: 600;
    }

    .price {
        color: var(--secondary-text);
        font-size: 0.85rem;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .quantity button {
        width: 28px;
        height: 28px;
        border: 1px solid var(--border-color);
        background: var(--surface);
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    .quantity button:hover {
        background: var(--border-color);
    }

    .subtotal {
        font-weight: 800;
        min-width: 80px;
        text-align: right;
    }

    .remove {
        background: none;
        border: none;
        color: #e74c3c;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 0.5rem;
        border-radius: 5px;
        transition: background 0.15s;
    }

    .remove:hover {
        background: rgba(231, 76, 60, 0.08);
    }

    @media (max-width: 520px) {
        .cart-item {
            grid-template-columns: auto 1fr auto;
            gap: 0.5rem;
        }
        .quantity {
            grid-column: 2;
        }
        .subtotal {
            grid-column: 1 / 3;
            text-align: left;
            font-weight: 500;
        }
    }
</style>
