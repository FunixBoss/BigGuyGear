import { map } from 'rxjs/operators';
import { ProductCategory } from './../../../@core/models/product/product-category.model';
import { ProductCategoryService } from './../../../@core/services/product/product-category.service';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbAccordionItemComponent } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductStyleService } from '../../../@core/services/product/product-style.service';
import { ProductService } from '../../../@core/services/product/product.service';
import { ProductColorService } from '../../../@core/services/product/product-color.service';
import { ProductColor } from '../../../@core/models/product/product-color.model';
import { ProductStyle } from '../../../@core/models/product/product-style.model';
import { Product } from '../../../@core/models/product/product.model';
import { CustomValidator } from '../../../@core/validators/custom-validator';
import { ImagesCarouselComponent } from '../images-carousel.component';
import { ProductVariant } from '../../../@core/models/product/product-variant.model';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { Router } from '@angular/router';
import { BRAND_IMAGE_DIRECTORY, CATEGORY_IMAGE_DIRECTORY } from '../../../@core/utils/image-storing-directory';
import { ProductBrandService } from '../../../@core/services/product/product-brand.service';
import { ProductBrand } from '../../../@core/models/product/product-brand.model';
import { ProductSaleService } from '../../../@core/services/product/product-sale.service';
import { ProductSale } from '../../../@core/models/sale/product-sale.model';
import { ProductSize } from '../../../@core/models/product/product-size.model';
import { ProductSizeService } from '../../../@core/services/product/product-size.service';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, AfterViewInit {
  @ViewChild(ImagesCarouselComponent) carousel: ImagesCarouselComponent;
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;
  Editor = ClassicEditor;
  editorConfig: any = { placeholder: 'Description' };

  styles: ProductStyle[];
  categories: ProductCategory[];
  sales: ProductSale[];
  brands: ProductBrand[];
  sizes: ProductSize[]
  colors: ProductColor[];


  // form chosen values
  addProductFormGroup: FormGroup
  images: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: ProductCategoryService,
    private brandService: ProductBrandService,
    private styleService: ProductStyleService,
    private saleService: ProductSaleService,
    private sizeService: ProductSizeService,
    private productService: ProductService,
    private colorService: ProductColorService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
      this.categories = data._embedded.categories.map(cate => {
        return {
          categoryId: cate.categoryId,
          categoryName: cate.categoryName,
          image: {
            imageId: cate.image.imageId,
            imageUrl: CATEGORY_IMAGE_DIRECTORY + cate.image.imageUrl
          }
        }
      })
    })
    this.brandService.findAll().subscribe(data => {
      this.brands = data._embedded.productBrands.map(brand => {
        return {
          productBrandId: brand.productBrandId,
          brandName: brand.brandName,
          image: {
            imageId: brand.image.imageId,
            imageUrl: BRAND_IMAGE_DIRECTORY + brand.image.imageUrl
          }
        }
      })
    })
    this.styleService.findAll().subscribe(data => { this.styles = data._embedded.productStyles })
    this.saleService.findAll().subscribe(data => {
      this.sales = data._embedded.productSales.filter(sale => sale.active != false)
    })
    this.sizeService.findAllBasic().subscribe(data => { this.sizes = data._embedded.productSizes })
    this.colorService.findAllBasic().subscribe(data => { this.colors = data._embedded.productColors })
    this.settingFormGroup()
    this.addVariant()
  }

  ngAfterViewInit(): void {
    this.accordions.first.toggle()
  }

  settingFormGroup(): void {
    this.addProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        name: ['', [CustomValidator.notBlank, Validators.maxLength(200)]],
        category: [null],
        brand: [null],
        style: [null],
        productSale: [null],
        new: [true],
        top: [false],
        active: [true],
        sale: [false],
        description: ['', [CustomValidator.notBlank, Validators.maxLength(1000)]],
        images: [this.images, [Validators.required]]
      }),
      variants: this.formBuilder.array([])
    })
  }

  selectProductSale() {
    if (this.product.get('productSale').value != null) {
      this.product.get('sale').setValue(true);
    } else {
      this.product.get('sale').setValue(false);
    }
  }

  // for variants
  selectFile(event: any, variantIndex: number) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.variants.controls[variantIndex].get('image').setValue(event.target.result)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // for product
  selectFiles(event: any) {
    this.images = []
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.product.get('images').setValue(this.images)
    this.product.get('images').setErrors(null)
    this.carousel.show(this.images);
  }

  get product() { return this.addProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.addProductFormGroup.controls["variants"] as FormArray }

  addVariant(event?: Event): void {
    event != undefined ? event.preventDefault() : "";
    const variantForm = this.formBuilder.group({
      price: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],

      sizeType: [null, [Validators.required]],
      basicSizeValue: [null, [Validators.required]],
      customSizeValue: ['', [Validators.required, Validators.maxLength(50)]],

      colorType: ['', [Validators.required]],
      basicColorValue: [null, [Validators.required]],
      customColorValue: ['', [Validators.required, Validators.maxLength(50)]],
      image: []
    })
    this.variants.push(variantForm)
  }

  removeVariant(variantIndex: number, event?: Event): void {
    event.preventDefault()
    this.variants.removeAt(variantIndex)
  }

  onSubmit() {
    console.log(this.product.get('images').value);
    
    for (let group of this.variants.controls) {
      if (group.get('colorType').value === 'basic') {
        group.get('customColorValue').setErrors(null);
      } else if (group.get('colorType').value === 'custom') {
        group.get('basicColorValue').setErrors(null)
      }

      if (group.get('sizeType').value === 'basic') {
        group.get('customSizeValue').setErrors(null);
      } else if (group.get('sizeType').value === 'custom') {
        group.get('basicSizeValue').setErrors(null)
      }
    }

    if (this.addProductFormGroup.invalid) {
      this.addProductFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
      return;
    }

    const insertProduct: Product = this.mapFormValue()
    console.log(insertProduct);
    this.productService.insert(insertProduct).subscribe(
      data => {
        if (data) {
          this.utilsService.updateToastState(new ToastState('Add Product Successfully!', 'success'))
          this.router.navigate(['/admin/product/list'])
        } else {
          this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
        }
      },
      error => {
        console.log(error);
        this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
      }  
    )
  }

  mapFormValue(): Product {
    let insertProduct: Product = new Product();
    insertProduct.productName = this.product.get('name').value;
    insertProduct.description = this.product.get('description').value;
    insertProduct.category = this.product.get('category').value;
    insertProduct.productBrand = this.product.get('brand').value;
    insertProduct.productSale = this.product.get('productSale').value;
    insertProduct.productStyle = this.product.get('style').value;
    insertProduct.active = this.product.get('active').value;
    insertProduct.top = this.product.get('top').value;
    insertProduct.new_ = this.product.get('new').value;
    insertProduct.sale = this.product.get('sale').value;

    insertProduct.images = this.product.get('images').value.map(imageStr => {
      return {
        imageId: null,
        imageUrl: imageStr
      }
    })
    insertProduct.createdAt = new Date();
    insertProduct.updatedAt = new Date();

    const productVariants: ProductVariant[] = this.variants.controls.map(variantForm => {
      return {
        productVariantId: null,
        price: +variantForm.get('price').value as number,
        quantity: +variantForm.get('quantity').value as number,

        productSize: (variantForm.get('sizeType').value == 'basic' ?
          variantForm.get('basicSizeValue').value :
          new ProductSize(null, variantForm.get('customSizeValue').value, 'custom')),

        productColor: (variantForm.get('colorType').value == 'basic' ?
          variantForm.get('basicColorValue').value :
          new ProductColor(null, variantForm.get('customColorValue').value, 'custom')),

        image: (variantForm.get('image').value != null)
          ? { imageId: null, imageUrl: variantForm.get('image').value } 
          : null
      };
    });
    insertProduct.productVariants = productVariants;
    return insertProduct;
  }

}

