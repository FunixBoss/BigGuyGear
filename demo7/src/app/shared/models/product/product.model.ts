import { Image } from "../Image";
import { ProductSale } from "../sale/product-sale.model";
import { ProductBrand } from "./product-brand.model";
import { ProductCategory } from "./product-category.model";
import { ProductReview } from "./product-review.model";
import { ProductStyle } from "./product-style.model";
import { ProductVariant } from "./product-variant.model";

export class Product {
    productId: number;
    productName: string;
    description: string;
    category?: ProductCategory;
    productBrand?: ProductBrand;
    productSale?: ProductSale;
    productStyle?: ProductStyle;
    active: boolean;
    sale: boolean;
    top: boolean;
    new_: boolean;
    createdAt: Date;
    updatedAt: Date;
    productVariants?: ProductVariant[]
    productReviews?: ProductReview[]
    images?: Image[]
    imageUrl?: string;
    imageUrls?: string[];
    totalSold?: number;
    totalLikes?: number;
    totalRating?: number;
    avgRating?: number;
    maxPrice?: number;
    minPrice?: number;
}