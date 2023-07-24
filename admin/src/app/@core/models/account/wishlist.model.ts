import { Product } from "../product/product.model";
import { Account } from "./account.model";

export class Wishlist {
    wishlistId: number;
    account?: Account
    product?: Product
    createdAt: Date
    updatedAt: Date
}