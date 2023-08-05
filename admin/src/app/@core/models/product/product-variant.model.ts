import { Image } from "../Image";
import { ProductColor } from "./product-color.model";
import { ProductSize } from "./product-size.model";

export class ProductVariant {
    productVariantId: number;
    productSize: ProductSize;
    productColor: ProductColor;
    quantity: number;
    price: number;
    image?: Image;
}