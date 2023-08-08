import { Paging } from "../response-page";

export class ProductStyle {
    productStyleId: number;
    styleName: string;
}

export class GetProductStyleResponse {
    _embedded: {
        productStyles: ProductStyle[]
    }
    page: Paging
}