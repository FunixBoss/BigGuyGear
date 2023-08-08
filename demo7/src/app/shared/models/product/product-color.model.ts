import { Paging } from "../response-page";
import { Product } from "./product.model";

export class ProductColor {
    productColorId: number;
    colorName: string;
    colorType: string

    constructor(productColorId: number, colorName: string, colorType: string) {
        this.colorName = colorName,
        this.colorType = colorType
        this.productColorId = productColorId
    }
}

export class GetColorResponse {
    _embedded: {
        productColors: ProductColor[]
    };
    page: Paging;
}