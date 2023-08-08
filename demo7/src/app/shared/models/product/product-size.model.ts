import { Paging } from "../response-page";

export class ProductSize {
    productSizeId: number;
    sizeName: string;
    sizeType: string;

    constructor(productSizeId: number, sizeName: string, sizeType: string) {
        this.productSizeId = productSizeId
        this.sizeName = sizeName,
        this.sizeType = sizeType
    }
}

export class GetProductSizeResponse {
    _embedded: {
        productSizes: ProductSize[]
    }
    page: Paging
}