import { Paging } from "../response-page";
import { Product } from "./product.model";

export class ProductColor {
    productColorId: number;
    colorName: string;
    colorType: string
}

export class GetColorResponse {
    _embedded: {
        productColors: ProductColor[]
    };
    page: Paging;
}