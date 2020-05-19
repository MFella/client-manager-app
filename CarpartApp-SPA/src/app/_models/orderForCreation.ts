export interface OrderForCreation {
    status: string;
    orderType: string;
    total: number;
    orderDate: Date;
    deliverDate: Date;
    orderItemsId: number[];
    quantities: number[];
}
