import { Image } from "../Image";
import { Paging } from "../response-page";

export class ProductBrand {
    productBrandId: number;
    brandName: string;
    image: Image;
}

export class GetProductBrandResponse {
    _embedded: {
        productBrands: ProductBrand[]
    }
    page: Paging
}