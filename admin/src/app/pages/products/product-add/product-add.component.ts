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
  descriptionContent: string;
  images: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: ProductCategoryService,
    private brandService: ProductBrandService,
    private styleService: ProductStyleService,
    private saleService: ProductSaleService,
    private productService: ProductService,
    private colorService: ProductColorService,
    private utilsService: UtilsService,
    private router: Router
  ) {
  }

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
    this.colorService.findAll().subscribe(data => { this.colors = data._embedded.productColors })
    this.settingFormGroup()
    this.addVariant()
  }

  ngAfterViewInit(): void {
    // this.accordions.first.toggle()
    1
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
        images: [this.images] // Initialize with the array of URLs, e.g., this.urls is the array obtained from selectFile method
      }),
      variants: this.formBuilder.array([])
    })
  }

  selectProductSale() {
    if(this.product.get('productSale').value != null) {
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
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }

    this.carousel.show(this.images);
  }

  get product() { return this.addProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.addProductFormGroup.controls["variants"] as FormArray }

  addVariant(event?: Event): void {
    event != undefined ? event.preventDefault() : "";
    const variantForm = this.formBuilder.group({
      price: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],

      size: [null, [Validators.required]],

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
    console.log(this.product.value);
    
    for (let group of this.variants.controls) {
      if (group.get('colorType').value === 'basic') {
        group.get('customColorValue').setErrors(null);
      }

      if (group.get('colorType').value === 'basic') {
        group.get('basicColorValue').setErrors(null)
      }
    }

    if (this.addProductFormGroup.invalid) {
      this.addProductFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
      return;
    }

    const insertProduct: Product = this.mapFormValue()
    console.log(insertProduct);
    this.productService.insert(insertProduct).subscribe(data => {

      this.utilsService.updateToastState(new ToastState('Add Product Successfully!', 'success'))
      this.router.navigate(['/admin/product/list'])
    })
  }

  mapFormValue(): Product {
    let insertProduct: Product = new Product();
    insertProduct.productName = this.product.get('name').value;
    insertProduct.description = this.product.get('description').value;
    insertProduct.category = this.product.get('category').value as ProductCategory;
    insertProduct.productBrand = this.product.get('brand').value as ProductBrand;
    insertProduct.productSale = this.product.get('sale').value as ProductSale;
    insertProduct.productStyle = this.product.get('style').value as ProductStyle;
    insertProduct.active = this.product.get('active').value as boolean;
    insertProduct.top = this.product.get('top').value as boolean;
    insertProduct.new = this.product.get('new').value as boolean;
    insertProduct.sale = this.product.get('sale').value as boolean;

    insertProduct.images = this.product.get('images').value
    insertProduct.createdAt = new Date();
    insertProduct.updatedAt = new Date();

    const productVariants: ProductVariant[] = this.variants.controls.map(variantForm => {
      return {
        productVariantId: null,
        productSize: variantForm.get('size').value,
        price: +variantForm.get('price').value as number,
        quantity: +variantForm.get('quantity').value as number,
        productColor: variantForm.get('colorType').value == 'Basic Color' ?
          this.getColorValueFromType(variantForm.get('colorType').value, variantForm.get('basicColorValue').value) :
          this.getColorValueFromType(variantForm.get('colorType').value, variantForm.get('customColorValue').value),
        image: variantForm.get('image').value
      };
    });
    insertProduct.productVariants = productVariants;
    return insertProduct;
  }

  getColorValueFromType(colorType, value): ProductColor {
    if (colorType == 'Basic Color') {
      return this.colors.find(color => color.colorName == value)
    } else {
      let newColor = new ProductColor();
      newColor.productColorId = null
      newColor.colorName = value
      return newColor;
    }
  }
}

