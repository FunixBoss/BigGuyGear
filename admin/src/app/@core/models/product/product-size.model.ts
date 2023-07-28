import { Paging } from "../response-page";

export class ProductSize {
    productSizeId: number;
    sizeName: string;
    sizeType: string;
}

export class GetProductSizeResponse {
    _embedded: {
        productSizes: ProductSize[]
    }
    page: Paging
}