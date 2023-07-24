import { Account } from "../account/account.model";
import { Product } from "./product.model";

export class ProductReview {
    productReviewId: number;
    account: Account;
    product: Product;
    content: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}