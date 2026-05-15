import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import * as model from "./model.server";

export const GET: RequestHandler = async () => {
    const cart = await model.getCart();
    return json(cart);
};

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();

    let result;
    switch (body.action) {
        case "add":
            result = await model.addToCart(body.productId, body.quantity ?? 1);
            break;
        case "remove":
            result = await model.removeFromCart(body.itemId);
            break;
        case "update":
            result = await model.updateQuantity(body.itemId, body.quantity);
            break;
        case "clear":
            result = await model.clearCart();
            break;
        default:
            return json({ error: "Unknown action" }, { status: 400 });
    }

    return json(result);
};
