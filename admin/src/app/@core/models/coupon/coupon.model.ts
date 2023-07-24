import { CouponType } from "./coupon-type.model";

export class Coupon {
    couponId: number;
    code: string;
    discount: number;
    couponType: CouponType
    description: string;
    createdAt: Date;
    expiredAt: Date;
}