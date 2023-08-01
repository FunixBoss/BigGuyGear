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
import { CustomValidator, isCouponCantBeUsed, isCouponNotExisting, isEmailNotExisting, isProductidNotExisting } from '../../../@core/validators/custom-validator';
import { Order } from '../../../@core/models/order/order.model';
import { AddressService } from '../../../@core/services/account/address.service';
import { ProductCouponService } from '../../../@core/services/product/product-coupon.service';
import { Router } from '@angular/router';
import { ACCOUNT_IMAGE_DIRECTORY } from '../../../@core/utils/image-storing-directory';

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

  paymentMethods: PaymentMethod[]
  orderStatuses: OrderStatus[]
  provinces: Province[]
  districts: District[]
  wards: Ward[]
  existingAddresses: Address[]

  addressOptions = [
    { value: 'existing', label: 'Use Existing Address', disabled: true },
    { value: 'new', label: 'New Address', disabled: true },
  ];

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
  ) { }
  

  settingFormGroup() {
    this.addOrderFormGroup = this.formBuilder.group({
      accountForm: this.formBuilder.group({
        email: ['', 
          [CustomValidator.notBlank],
          [isEmailNotExisting(this.accountService)]],
        applyCoupon: [false],
        coupon: ['', 
          [Validators.required],
          [isCouponNotExisting(this.couponService), isCouponCantBeUsed(this.couponService)]],

        totalPrice: [0, Validators.required],
        totalQuantity: [0, Validators.required],
        orderStatus: ['', Validators.required],
        paymentMethod: ['', Validators.required],

        addressOption: ['', Validators.required],
        // for address option = new
        province: ['', Validators.required],
        district: ['', Validators.required],
        ward: ['', Validators.required],
        roadName: ['', [Validators.required, Validators.maxLength(50)]],

        // for address option = existing
        address: [null, [Validators.required]]
      }),
      products: this.formBuilder.array([])
    })
  }

  get accountForm() { return this.addOrderFormGroup.controls["accountForm"] as FormGroup }
  get products() { return this.addOrderFormGroup.controls["products"] as FormArray }

  ngOnInit() {
    this.orderStatusService.findAll().subscribe(data => this.orderStatuses = data._embedded.orderStatuses)
    this.paymentMethodService.findAll().subscribe(data => this.paymentMethods = data._embedded.paymentMethods)
    this.settingFormGroup()
    this.addProduct()
    this.accountCompleter()
    this.onAddressChange()
  }
  
  accountCompleter$: Observable<Account[]>;
  accountCompleter() {
    this.accountCompleter$ = this.accountForm.get('email').valueChanges.pipe(
      startWith(''),
      switchMap(enteredEmail => {
        return this.accountService.findByEmailKeyword(enteredEmail)
      })
    );
  }

  selectCustomer(account: Account) {
    this.accountForm.get('email').setValue(account.email);

    this.addressService.findByAccountId(account.id).subscribe(data => {
      this.existingAddresses = data
      if(this.existingAddresses.length > 0) {
        this.addressOptions[1].disabled = false
        this.addressOptions[0].disabled = false
        this.accountForm.get('addressOption').setValue('existing')
      } else {
        this.addressOptions[1].disabled = false 
        this.accountForm.get('addressOption').setValue('new')
        this.loadProvinces()
      }
    })
  }

  loadProvinces() {
    this.addressService.findAllProvinces().subscribe(
      data => {
        this.provinces = data._embedded.provinces
        this.accountForm.get('district').setValue({})
        this.accountForm.get('ward').setValue({})
      }
    )
  }

  loadDistricts(event: any) {
    const selectedProvince: Province = this.accountForm.get('province').value
    this.addressService.findAllDistrictByProvince(selectedProvince.code).subscribe(
      data => {
        this.districts = data._embedded.districts
      }
    );
  }

  loadWards(event: any) {
    const selectedDistrict: District = this.accountForm.get('district').value
    this.addressService.findAllWardByDistrict(selectedDistrict.code).subscribe(
      data => {
        this.wards = data._embedded.wards
        this.accountForm.get('ward').setValue({})
      }
    );
  }


  onAddressChange() {
    this.accountForm.get('province').valueChanges.subscribe(data => {
      this.accountForm.patchValue({
        district: '',
        wards: '',
        address: ''
      });
    });
    this.accountForm.get('district').valueChanges.subscribe(data => {
      this.accountForm.patchValue({
        wards: '',
        address: ''
      });
    });
  }
  
  ngAfterViewInit(): void {
    // this.accordions.first.toggle()
    1
  }
  
  

  



  onSubmit() {
    let order: Order = this.mapFormValue()
    console.log(order)

    if(this.addOrderFormGroup.invalid) {
      this.addOrderFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Order Failed!', "danger"))
      return;
    }

    // let order: Order = this.mapFormValue()
    // console.log(order)

    this.orderService.insert(order).subscribe(
      data => {
        if(data) {
          this.utilsService.updateToastState(new ToastState('Add Order Successfully!!', "success"))
          this.router.navigate(['/admin/orders/list'])
        }
      },  
      error => {
        this.utilsService.updateToastState(new ToastState('Add Order Failed!', "danger"))
        console.log(error);
        
      }
    
    )


  }

  mapFormValue(): any {
    let order: Order   = new Order()
    order.accountEmail = this.accountForm.get('email').value
    if(this.accountForm.get('applyCoupon').value) {
      this.couponService.findByCode(this.accountForm.get('coupon').value)
        .subscribe(data => order.coupon = data)
    }
    if(this.accountForm.get('addressOption').value == 'new') {
      order.address = {
        addressId: null,
        roadName: this.accountForm.get('roadName').value,
        ward: this.accountForm.get('ward').value,
        district: this.accountForm.get('district').value,
        province: this.accountForm.get('province').value
      }
    } else {
      order.address = this.accountForm.get('address').value
    }
    order.orderStatus = this.accountForm.get('orderStatus').value
    order.paymentMethod = this.accountForm.get('paymentMethod').value
    order.totalQuantity = this.accountForm.get('totalQuantity').value
    order.totalPrice = this.accountForm.get('totalPrice').value;
    order.products = [];

    // for(let i = 0; i < this.products.length; i++) {
    //   const productForm: FormGroup = this.products.at(i) as FormGroup;
    //   let product: any = {}
    //   product.productId = productForm.get('id').value
    //   product.size = productForm.get('size').value
    //   product.color = productForm.get('color').value
    //   product.quantity = productForm.get('quantity').value
    //   product.price = parseFloat(productForm.get('price').value)
    //   order.products.push(product)
    // }
    return order;
  }

  
  


  productCompleter$: Observable<Product[]>
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
    this.accountForm.get('totalQuantity').setValue(totalQuantity);
    this.accountForm.get('totalPrice').setValue(totalPrice);
  }

}
