import { Account } from "./account.model";

export class Notification {
    notificationId: number;
    message: string;
    account: Account;
    createdAt: Date
    isRead: boolean
}