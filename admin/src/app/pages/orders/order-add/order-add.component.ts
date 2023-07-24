import { ToastState, UtilsService } from './../../../@core/services/utils.service';
import { ProductService } from './../../../@core/services/product/product.service';
import { PaymentMethodService } from './../../../@core/services/order/payment-method.service';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbAccordionItemComponent } from '@nebular/theme';
import { CompleterCmp, CompleterData, CompleterService } from 'ng2-completer';
import { Observable, of, } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';
import { OrderService } from '../../../@core/services/order/order.service';
import { OrderStatusService } from '../../../@core/services/order/order-status.service';
import { PaymentMethod } from '../../../@core/models/order/payment-method.model';
import { OrderStatus } from '../../../@core/models/order/order-status.model';
import { Account } from '../../../@core/models/account/account.model';
import { AccountService } from '../../../@core/services/account/account.service';
import { Ward } from '../../../@core/models/address/wards.model';
import { Province } from '../../../@core/models/address/provinces.model';
import { District } from '../../../@core/models/address/districts.model';
import { Address } from '../../../@core/models/address/address.model';
import { Product } from '../../../@core/models/product/product.model';
import { CustomValidator, isCouponExisting, isEmailNotExisting, isProductidNotExisting } from '../../../@core/validators/custom-validator';
import { Order } from '../../../@core/models/order/order.model';
import { ModelResponse } from '../../../@core/models/response/ModelResponse';
import { AddressService } from '../../../@core/services/account/address.service';
import { ProductCouponService } from '../../../@core/services/product/product-coupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit, AfterViewInit {
  @ViewChild(CompleterCmp, { static: false }) completer: CompleterCmp;
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;
  
  addOrderFormGroup: FormGroup
  // basic information
  chosenAccount: Account;
  accountDetail: Account;

  paymentMethods: PaymentMethod[]
  orderStatuses: OrderStatus[]
  provinces: Province[]
  districts: District[]
  wards: Ward[]
  existingAddress: Address[]

  addressOptions = [
    { value: 'existing', label: 'Use Existing Address', disabled: true },
    { value: 'new', label: 'New Address', disabled: true },
  ];
  applyCoupon: boolean = false;

  // for order's products

  constructor(
    private orderService: OrderService,
    private orderStatusService: OrderStatusService,
    private paymentMethodService: PaymentMethodService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public utilsService: UtilsService,
    private addressService: AddressService,
    private couponService: ProductCouponService,
    private router: Router
  ) {
      this.orderStatusService.findAll().subscribe(data => this.orderStatuses = data)
      this.paymentMethodService.findAll().subscribe(data => this.paymentMethods = data)
  }
  

  settingFormGroup() {
    this.addOrderFormGroup = this.formBuilder.group({
      email: ['', CustomValidator.notBlank, isEmailNotExisting(this.accountService)],
      coupon: [''],
      totalPrice: [0, Validators.required],
      totalQuantity: [0, Validators.required],
      orderStatus: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      addressOption: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      address: ['', Validators.required, Validators.maxLength(50)],
      products: this.formBuilder.array([])
    })

    this.checkCouponExists()
  }

  ngOnInit() {
    this.settingFormGroup()
    this.addProduct()
    this.accountCompleter()
    this.onAddressChange()
  }
  
  accountCompleter$: Observable<Account[]>;
  accountCompleter() {
    this.accountCompleter$ = this.addOrderFormGroup.get('email').valueChanges.pipe(
      startWith(''),
      switchMap(enteredEmail => {
        if(this.addOrderFormGroup.get('email').value == '') {
          return this.accountService.findByEmailKeyword('')
        }
        return this.accountService.findByEmailKeyword(enteredEmail)
      })
    );
  }

  onAddressChange() {
    this.addOrderFormGroup.get('province').valueChanges.subscribe(data => {
      this.addOrderFormGroup.patchValue({
        district: '',
        wards: '',
        address: ''
      });
    });
    this.addOrderFormGroup.get('district').valueChanges.subscribe(data => {
      this.addOrderFormGroup.patchValue({
        wards: '',
        address: ''
      });
    });
  }
  
  ngAfterViewInit(): void {
    // this.accordions.first.toggle()
    1
  }
  
  selectCustomer(account: Account) {
    this.chosenAccount = account;
    this.accountService.findById(this.chosenAccount.id).subscribe(
      data => {
        this.accountDetail = data
        this.setUpAccountAddress()
      }
    )
  }

  setUpAccountAddress() {
    this.addOrderFormGroup.get('email').setValue(this.chosenAccount.email)
    
    if(this.accountDetail.address == undefined) {
      this.addressOptions[1].disabled = false
      this.addOrderFormGroup.get('addressOption').setValue('new')
      this.loadProvinces()
    } else {
      this.addressOptions[0].disabled = true
      this.addressOptions[1].disabled = true

      this.existingAddress = this.chosenAccount.address
    }
  }



  onSubmit() {
    if(this.addOrderFormGroup.invalid) {
      this.addOrderFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('add', 'order', 'danger'))
      return;
    }

    let order: any = this.mapFormValue()
    console.log(order)

    this.orderService.insert(order).subscribe(
      data => {
        if(data) {
          this.utilsService.updateToastState(new ToastState('add', 'order', 'success'))
          this.router.navigate(['/admin/orders/list'])
        }
      },  
      error => {
        this.utilsService.updateToastState(new ToastState('add', 'order', 'danger'))
        console.log(error);
        
      }
    
    )


  }

  mapFormValue(): any {
    let order:any  = new Order()
    order.customerEmail = this.addOrderFormGroup.get('email').value
    if(this.applyCoupon) {
      this.couponService.findIdByCode(this.addOrderFormGroup.get('coupon').value)
        .subscribe(data => order.couponId = data)
    }
    order.roadName = this.addOrderFormGroup.get('address').value
    order.wardCode = this.addOrderFormGroup.get('ward').value['code']
    order.districtCode = this.addOrderFormGroup.get('district').value['code']
    order.provinceCode = this.addOrderFormGroup.get('province').value['code']
    order.orderStatusId = this.addOrderFormGroup.get('orderStatus').value['orderStatusId']
    order.paymentMethodId = this.addOrderFormGroup.get('paymentMethod').value['paymentMethodId']
    order.totalQuantity = this.addOrderFormGroup.get('totalQuantity').value
    order.totalPrice = this.addOrderFormGroup.get('totalPrice').value;
    order.products = [];

    for(let i = 0; i < this.products.length; i++) {
      const productForm: FormGroup = this.products.at(i) as FormGroup;
      let product: any = {}
      product.productId = productForm.get('id').value
      product.size = productForm.get('size').value
      product.color = productForm.get('color').value
      product.quantity = productForm.get('quantity').value
      product.price = parseFloat(productForm.get('price').value)
      order.products.push(product)
    }
    return order;
  }

  loadProvinces() {
    this.addressService.findAllProvinces().subscribe(
      data => {
        this.provinces = data.provinces
        this.addOrderFormGroup.get('district').setValue({})
        this.addOrderFormGroup.get('ward').setValue({})
      }
    )
  }

  loadDistricts(event: any) {
    const selectedProvince: Province = this.addOrderFormGroup.get('province').value
    this.addressService.findAllDistrictByProvince(selectedProvince.code).subscribe(
      data => {
        this.districts = data.districts
      }
    );
  }

  loadWards(event: any) {
    const selectedDistrict: District = this.addOrderFormGroup.get('district').value
    this.addressService.findAllWardByDistrict(selectedDistrict.code).subscribe(
      data => {
        this.wards = data.wards
        this.addOrderFormGroup.get('ward').setValue({})
      }
    );
  }

  checkCouponExists() {
    this.addOrderFormGroup.get('coupon').valueChanges.subscribe(
      () => {
        const couponValue = this.addOrderFormGroup.get('coupon').value
        console.log(couponValue);
        if(this.applyCoupon && couponValue == '') {
          this.addOrderFormGroup.get('coupon').setErrors({couponNotExists : true})
          return;
        }
        this.couponService.isCouponExists(couponValue).subscribe(
          result => {
            if(!result) {
              this.addOrderFormGroup.get('coupon').setErrors({couponNotExists : true})
            }
        
          }
        )
      }
    )
  }


  productCompleter$: Observable<Product[] | ModelResponse>
  productCompleter(productFormIndex: number) {
    this.productCompleter$ = this.products.at(productFormIndex).get('id').valueChanges.pipe(
      startWith(''),
      switchMap(enteredProductName => {
        if(this.products.at(productFormIndex).get('id').value == '') {
          return this.productService.findByNameKeyword('')
        }
        return this.productService.findByNameKeyword(enteredProductName)
      })
    );
  }

  get products() { return this.addOrderFormGroup.controls["products"] as FormArray }

  addProduct(): void {
    const productForm = this.formBuilder.group({
      id: [,  CustomValidator.notBlank, isProductidNotExisting(this.productService)],
      size: [, [Validators.required]] ,
      sizes: [],
      color: [, [Validators.required]],
      colors: [],
      price: [],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
    })
    this.products.push(productForm)
    this.productCompleter(this.products.controls.length - 1)
  }

  removeProduct(productFormIndex: number): void { this.products.removeAt(productFormIndex) }

  selectProduct(product: Product, productFormIndex: number) {
    let productForm = this.products.controls[productFormIndex];
    productForm.get('id').setValue(product.productId)

    // load sizes
    this.orderService.findSizesFromProductId(product.productId).subscribe(
      data => {productForm.get('sizes').setValue(data)}
    )

    // load color from size 
    const sizeControl = productForm.get('size')
    sizeControl.valueChanges.subscribe(
      () => {
        this.orderService.findColorFromSize(product.productId, sizeControl.value).subscribe(
          data => {productForm.get('colors').setValue(data)}
        )

      }
    )

    // load price
    const colorControl = productForm.get('color')
    colorControl.valueChanges.subscribe(
      () => {
        this.orderService.findPrice(product.productId, sizeControl.value, colorControl.value).subscribe(
          data => {productForm.get('price').setValue(data)}
        )
      }
    )

    const quantityControl = productForm.get('quantity')
    quantityControl.valueChanges.subscribe(
      () => {
        this.countTotalPriceAndTotalQuantity()
      }
    )
  }

  countTotalPriceAndTotalQuantity() {
    let totalQuantity: number = 0;
    let totalPrice: number = 0;
    
    for(let i = 0; i < this.products.length; i++) {
      const productForm: FormGroup = this.products.at(i) as FormGroup;
      totalQuantity += parseInt(productForm.get('quantity').value, 10);
      totalPrice += parseFloat(productForm.get('price').value) * totalQuantity;
    }
    this.addOrderFormGroup.get('totalQuantity').setValue(totalQuantity);
    this.addOrderFormGroup.get('totalPrice').setValue(totalPrice);
    
  }

}
