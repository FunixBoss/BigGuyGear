import { AccountService } from './../services/account/account.service';
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ProductService } from '../services/product/product.service';
import { ProductCouponService } from '../services/product/product-coupon.service';
export class CustomValidator {

    static accountService: AccountService;
    constructor(
        accountService2: AccountService
    ) {
        CustomValidator.accountService = accountService2
    }
    static notBlank(control: FormControl): ValidationErrors {
        if (typeof control.value === 'string') {
            if (control.value != null && control.value.trim().length === 0) {
                return { 'notblank': true };
            }
        } else if (typeof control.value === 'number') {
            if (control.value === null || isNaN(control.value)) {
                return { 'notblank': true };
            }
        }

        return null;
    }

    static maxCouponValue(control: AbstractControl): ValidationErrors | null {
        const discountTypeControl = control.parent?.get('discountType');
        const discountValue = control.value;

        if (discountTypeControl?.value === 'Percent' && discountValue > 100) {
            return { max: true };
        }
        return null;
    }


}

export function isEmailNotExisting(accountService: AccountService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        // Use the AccountService to check if the email exists
        return accountService.isEmailExists(control.value).pipe(
            map((exists: boolean) => (!exists ? { emailNotExisting: true } : null))
        );
    };
}

export function isCouponExisting(couponService: ProductCouponService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        // Use the AccountService to check if the email exists
        return couponService.isCouponExists(control.value).pipe(
            map((exists: boolean) => {
                return !exists ? { couponNotExist: true } : null
            })
        );
    };
}

export function isProductidNotExisting(productService: ProductService) {
    // return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // Use the AccountService to check if the email exists
    // return productService.findById(+control.value).pipe(
    //     map(product => product == null ? { productNotExisting: true } : null)
    // );
    // };
    return;
}