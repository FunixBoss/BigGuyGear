import { Image } from "../Image";
import { Paging } from "../response-page";

export class ProductCategory {
    categoryId: number;
    categoryName: string;
    image: Image;
}

export class GetCategoryResponse {
    _embedded: {
        categories: ProductCategory[]
    }
    page: Paging
}