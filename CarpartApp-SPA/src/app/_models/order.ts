export interface Order {
    id: number;
    clientId: number;
    status: string;
    orderType: string;
    total: number;
    orderDate: Date;
    deliverDate: Date;
}
