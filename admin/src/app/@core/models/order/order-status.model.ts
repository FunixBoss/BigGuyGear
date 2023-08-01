export class OrderStatus {
    orderStatusId: number;
    statusName: string;
    statusDescription: string;
}

export class GetOrderStatusResponse {
    _embedded: {
        orderStatuses: OrderStatus[]
    }
}