import { Image } from "../Image";
import { ProductCategory } from "./product-category.model";
import { ProductShape } from "./product-shape.model";
import { ProductStyle } from "./product-style.model";
import { ProductVariant } from "./product-variant.model";

export class Product {
    productId: number;
    productName: string;
    description: string;
    isHide: boolean;
    category: ProductCategory;
    productShape: ProductShape;
    productStyle: ProductStyle;
    createdAt: Date;
    updatedAt: Date;
    
    // optionals
    productVariants?: ProductVariant[]
    images?: Image[]
    totalQuantity?: number
    quantitySold?: number
    totalLikes?: number
    rating?: number
    totalRating?: number
}

export class GetResponseProduct {
    product: Product;
    links: {
        linksabcxyz
    }
}