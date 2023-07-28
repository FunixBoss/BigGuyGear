import { Image } from "../Image";
import { ProductSale } from "../sale/product-sale.model";
import { ProductBrand } from "./product-brand.model";
import { ProductCategory } from "./product-category.model";
import { ProductStyle } from "./product-style.model";
import { ProductVariant } from "./product-variant.model";

export class Product {
    productId: number;
    productName: string;
    description: string;
    category?: ProductCategory;
    productBrand?:ProductBrand;
    productSale?: ProductSale;
    productStyle?: ProductStyle;
    active: boolean;
    sale: boolean;
    top: boolean;
    new: boolean;
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
