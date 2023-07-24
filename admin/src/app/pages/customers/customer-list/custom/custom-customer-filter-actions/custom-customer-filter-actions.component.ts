import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { DefaultFilter } from 'ng2-smart-table';
import { ToastState, UtilsService } from '../../../../../@core/services/utils.service';
import { CustomValidator } from '../../../../../@core/validators/custom-validator';
import { AccountService } from '../../../../../@core/services/account/account.service';
import { Account } from '../../../../../@core/models/account/account.model';
import { error } from 'console';

@Component({
    templateUrl: 'custom-customer-filter-actions.component.html',
    styleUrls: ['custom-customer-filter-actions.scss']
})
export class CustomCustomerFilterActionsComponent extends DefaultFilter implements OnInit, OnChanges {

    inputControl = new FormControl();

    windowRef: NbWindowRef;
    @ViewChild('createCustomer') createCustomerWindow: TemplateRef<any>;
    addCustomerFormGroup: FormGroup;

    constructor(
        private windowService: NbWindowService,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private accountService: AccountService
    ) {
        super();
    }

    ngOnInit() {
        this.addCustomerFormGroup = this.formBuilder.group({
            email: [, [Validators.required, Validators.maxLength(100)]],
            password: [, [Validators.required, Validators.maxLength(100)]],
            fullName: [, [Validators.required, Validators.maxLength(100)]],
            phoneNumber: [, [Validators.required, Validators.maxLength(100)]],
            image: [, Validators.required],
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        let x
    }

    onAdd() {
        this.windowRef = this.windowService.open(
            this.createCustomerWindow,
            { title: 'Add Customer Account' },
        );
    }

    addCustomer() {
        if (this.addCustomerFormGroup.invalid) {
            this.addCustomerFormGroup.markAllAsTouched();
            this.utilsService.updateToastState(new ToastState('add', 'account', 'danger'))
            return;
        }
        let account: any = new Account();
        account.email = this.addCustomerFormGroup.get('email').value
        account.password = this.addCustomerFormGroup.get('password').value
        account.fullName = this.addCustomerFormGroup.get('fullName').value
        account.phoneNumber = this.addCustomerFormGroup.get('phoneNumber').value
        account.image = this.addCustomerFormGroup.get('image').value
        account.roleId = 2;
        console.log(account);
        
        this.accountService.insert(account).subscribe(
            data => {
                if(data) {
                    this.utilsService.updateToastState(new ToastState('add', 'account', 'success'))
                    this.accountService.notifyAccountChange()
                    this.windowRef.close();
                }
            },
            error => console.log(error)
        )
    }

    selectFile(event: any) {
        if (event.target.files) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.addCustomerFormGroup.get('image').setValue(event.target.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

}