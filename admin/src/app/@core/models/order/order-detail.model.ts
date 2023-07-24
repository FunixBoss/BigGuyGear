import { ProductColor } from "../product/product-color.model";
import { Product } from "../product/product.model";
import { Order } from "./order.model";

export class OrderDetail {
    orderDetailId: number;
    order?: Order
    productId: number;
    height: number;
    width: number;
    color: ProductColor;
    quantity: number;
    price: number;
    imageUrl?: string;
}