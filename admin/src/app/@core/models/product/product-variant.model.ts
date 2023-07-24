import { Image } from "../Image";
import { ProductColor } from "./product-color.model";

export class ProductVariant {
    productVariantId: number;
    height: number;
    width: number;
    color: ProductColor;
    quantity: number;
    price: number;
    image?: Image;
}