import { ProductColor } from "../product/product-color.model";
import { Product } from "../product/product.model";
import { Order } from "./order.model";

export class OrderDetail {
    orderDetailId: number;
    productId?: number;
    productName: string;
    imageUrl?: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
}