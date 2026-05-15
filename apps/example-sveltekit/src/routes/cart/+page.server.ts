import type { PageServerLoad } from "./$types";
import { getCart } from "./model.server";

export const load: PageServerLoad = async () => {
    const cart = await getCart();
    return { cart };
};
