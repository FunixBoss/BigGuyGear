import { Image } from "../Image";
import { ProductSale } from "../sale/product-sale.model";
import { ProductBrand } from "./product-brand.model";
import { ProductCategory } from "./product-category.model";
import { ProductStyle } from "./product-style.model";
import { ProductVariant, ProductVariantDTO } from "./product-variant.model";

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
    images?: Image[]
}

export class ProductFindAllDTO {
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    productBrandId: number;
    brandName: string;
    productSaleId: number;
    saleName: string;
    productStyleId: number;
    imageUrl: string;
    styleName: string;
    active: true;
    sale: true;
    top: false;
    new_: true;
    createdAt: Date;
    updatedAt: Date;
    totalSold: number;
    totalLikes: number;
    totalRating: number;
    avgRating: number;
}

export class ProductDetailDTO {
    productId: number;
    productName;
    categoryId: number;
    categoryName;
    productBrandId: number;
    brandName;
    productSaleId: number;
    saleName;
    productStyleId: number;
    styleName;
    description;
    imageUrls: string[];
    productVariants: ProductVariantDTO[];
    active: boolean;
    sale: boolean;
    top: boolean;
    new_: boolean
    createdAt: Date;
    updatedAt: Date;
    totalSold: number;
    totalLikes: number;
    totalRating: number;
    avgRating: number;
}