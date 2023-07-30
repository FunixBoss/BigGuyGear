import { PRODUCT_IMAGE_DIRECTORY, VARIANT_IMAGE_DIRECTORY } from './../../../@core/utils/image-storing-directory';
import { ProductCategory } from './../../../@core/models/product/product-category.model';
import { ProductCategoryService } from './../../../@core/services/product/product-category.service';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbAccordionItemComponent } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductStyleService } from '../../../@core/services/product/product-style.service';
import { ProductService } from '../../../@core/services/product/product.service';
import { ProductColorService } from '../../../@core/services/product/product-color.service';
import { ProductColor } from '../../../@core/models/product/product-color.model';
import { ProductStyle } from '../../../@core/models/product/product-style.model';
import { Product, ProductDetailDTO } from '../../../@core/models/product/product.model';
import { CustomValidator } from '../../../@core/validators/custom-validator';
import { ImagesCarouselComponent } from '../images-carousel.component';
import { ProductVariant } from '../../../@core/models/product/product-variant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { Image } from '../../../@core/models/Image';
import { forkJoin } from 'rxjs';
import { ProductSale } from '../../../@core/models/sale/product-sale.model';
import { ProductBrand } from '../../../@core/models/product/product-brand.model';
import { ProductSize } from '../../../@core/models/product/product-size.model';
import { BRAND_IMAGE_DIRECTORY, CATEGORY_IMAGE_DIRECTORY } from '../../../@core/utils/image-storing-directory';
import { ProductBrandService } from '../../../@core/services/product/product-brand.service';
import { ProductSaleService } from '../../../@core/services/product/product-sale.service';
import { ProductSizeService } from '../../../@core/services/product/product-size.service';

@Component({
  selector: 'ngx-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @ViewChild(ImagesCarouselComponent) carousel: ImagesCarouselComponent;
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;
  Editor = ClassicEditor;
  editorConfig: any = { placeholder: 'Description' };

  edittingProduct;
  edittingProductId: string;
  styles: ProductStyle[];
  categories: ProductCategory[];
  sales: ProductSale[];
  brands: ProductBrand[];
  sizes: ProductSize[]
  colors: ProductColor[];

  editProductFormGroup: FormGroup
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
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(
      params => {
        this.edittingProductId = params['id']
        this.productService.findById(+this.edittingProductId).subscribe(
          (dto: ProductDetailDTO) => {
            this.edittingProduct = {
              productId: dto.productId,
              productName: dto.productName,
              description: dto.description,
              category: (dto.productBrandId != null ? 
                { categoryId: dto.categoryId, categoryName: dto.categoryName } :
                null
              ),
              productBrand: (dto.productBrandId != null ? 
                { productBrandId: dto.productBrandId, brandName: dto.brandName } : 
                null
              ),
              productSale: (dto.productSaleId != null ? 
                { productSaleId: dto.productSaleId, saleName: dto.saleName } : 
                null
              ),
              productStyle: (dto.productStyleId != null ? 
                { productStyleId: dto.productStyleId, styleName: dto.styleName } : 
                null 
              ),
              active: dto.active,
              sale: dto.sale,
              top: dto.top,
              new_: dto.new_,
              productVariants: dto.productVariants,
              images: dto.imageUrls.map(url => {
                return PRODUCT_IMAGE_DIRECTORY + url
              })
            };
          }
        )
      }
    )
  }

  settingFormGroup(): void {
    this.editProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        id: [],
        name: ['', [CustomValidator.notBlank, Validators.maxLength(200)]],
        category: [null],
        brand: [null],
        style: [null],
        productSale: [null],
        new_: [false],
        top: [false],
        active: [false],
        sale: [false],
        description: ['', [CustomValidator.notBlank, Validators.maxLength(1000)]],
        images: [this.images]
      }),
      variants: this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this.settingFormGroup()
    const category$ = this.categoryService.findAll();
    const brand$ = this.brandService.findAll()
    const style$ = this.styleService.findAll();
    const sale$ = this.saleService.findAll();
    const color$ = this.colorService.findAllBasic();
    const size$ = this.sizeService.findAllBasic();

    forkJoin([category$, brand$, style$, sale$, color$, size$]).subscribe(
      ([categoryData, brandData, styleData, saleData, colorData, sizeData]) => {
        this.categories = categoryData._embedded.categories.map(cate => {
          return {
            categoryId: cate.categoryId,
            categoryName: cate.categoryName,
            image: {
              imageId: cate.image.imageId,
              imageUrl: CATEGORY_IMAGE_DIRECTORY + cate.image.imageUrl
            }
          }
        })
        this.brands = brandData._embedded.productBrands.map(brand => {
          return {
            productBrandId: brand.productBrandId,
            brandName: brand.brandName,
            image: {
              imageId: brand.image.imageId,
              imageUrl: BRAND_IMAGE_DIRECTORY + brand.image.imageUrl
            }
          }
        })
        this.sales = saleData._embedded.productSales.filter(sale => sale.active != false)
        this.styles = styleData._embedded.productStyles;
        this.colors = colorData._embedded.productColors;
        this.sizes = sizeData._embedded.productSizes

        this.fillFormValues();
        console.log(this.variants.value);
        
      },
      error => {
        console.error(error);
      }
    );
  }

  fillFormValues() {
    this.product.get('id').setValue(this.edittingProduct.productId);
    this.product.get('name').setValue(this.edittingProduct.productName);
    this.product.get('description').setValue(this.edittingProduct.description)
    this.product.get('new_').setValue(this.edittingProduct.new_)
    this.product.get('active').setValue(this.edittingProduct.active)
    this.product.get('top').setValue(this.edittingProduct.top)

    if(this.edittingProduct.category != null) {
      const category = this.categories.find(cate => cate.categoryId == this.edittingProduct.category.categoryId);
      this.product.get('category').setValue(category)
    }

    if(this.edittingProduct.productBrand != null) {
      const brand = this.brands.find(b => b.productBrandId == this.edittingProduct.productBrand.productBrandId);
      this.product.get('brand').setValue(brand)
    }

    if(this.edittingProduct.productSale != null) {
      const sale = this.sales.find(s => s.productSaleId == this.edittingProduct.productSale.productSaleId);
      this.product.get('productSale').setValue(sale)
      this.product.get('sale').setValue(true)
    } else {
      this.product.get('sale').setValue(false)
    }

    if(this.edittingProduct.productStyle != null) {
      const style = this.styles.find(s => s.productStyleId == this.edittingProduct.productStyle.productStyleId);
      this.product.get('style').setValue(style)
    }
    this.carousel.show(this.edittingProduct.images);
    
    if (this.edittingProduct.productVariants.length == 0 ||
      this.edittingProduct.productVariants == null) {
      this.addVariant();
      return;
    }

    // setting product's variants
    for (let i = 0; i < this.edittingProduct.productVariants.length; i++) {
      const variant = this.edittingProduct.productVariants[i];
      this.addVariant()
      let variantForm: FormGroup = this.variants.at(i) as FormGroup
      variantForm.get('id').setValue(variant.productVariantId)
      variantForm.get('quantity').setValue(variant.quantity)
      variantForm.get('price').setValue(variant.price)

      if (variant.productColor.colorType == 'basic') {
        variantForm.get('colorType').setValue('basic')
        const color = this.colors.find(c => c.productColorId == variant.productColor.productColorId);
        variantForm.get('basicColorValue').setValue(color)
      } else {
        variantForm.get('colorType').setValue('custom')
        variantForm.get('customColorValue').setValue(variant.productColor.colorName)
      }

      if (variant.productSize.sizeType == 'basic') {
        variantForm.get('sizeType').setValue('basic')
        const size = this.sizes.find(s => s.productSizeId == variant.productSize.productSizeId);
        variantForm.get('basicSizeValue').setValue(size)
      } else {
        variantForm.get('sizeType').setValue('custom')
        variantForm.get('customSizeValue').setValue(variant.productSize.sizeName)
      }
      if (variant.imageUrl != null) {
        variantForm.get('image').setValue(VARIANT_IMAGE_DIRECTORY + variant.imageUrl);
      }
    }

  }

  get product() { return this.editProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.editProductFormGroup.controls["variants"] as FormArray }

  

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


  addVariant(event?: Event): void {
    event != undefined ? event.preventDefault() : "";
    const variantForm = this.formBuilder.group({
      id: [],
      price: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],

      sizeType: ['', [Validators.required]],
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
    event != undefined ? event.preventDefault() : "";
    this.variants.removeAt(variantIndex)
  }

  onSubmit() {
    for (let group of this.variants.controls) {
      if (group.get('colorType').value === 'basic') {
        group.get('customColorValue').setErrors(null);
      } else if(group.get('colorType').value === 'custom') {
        group.get('basicColorValue').setErrors(null)
      }

      if (group.get('sizeType').value === 'basic') {
        group.get('customSizeValue').setErrors(null);
      } else if(group.get('sizeType').value === 'custom') {
        group.get('basicSizeValue').setErrors(null)
      }
    }
    if (this.editProductFormGroup.invalid) {
      this.editProductFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Edit Product Failed!', "danger"))
      return;
    }

    const editedProduct: Product = this.mapFormValue()
    console.log(editedProduct)

    this.productService.update(editedProduct).subscribe(data => {
      if (data) {
        this.utilsService.updateToastState(new ToastState('Edit Product Successfully!', "success"))
        // this.router.navigate(['/admin/product/list'])
      } else {
        this.utilsService.updateToastState(new ToastState('Edit Product Failed!', "danger"))
      }
    })
  }

  mapFormValue(): Product {
    let product: Product = new Product();
    product.productId = this.product.get('id').value 
    product.productName = this.product.get('name').value;
    product.description = this.product.get('description').value;
    product.category = this.product.get('category').value;
    product.productBrand = this.product.get('brand').value;
    product.productSale = this.product.get('productSale').value;
    product.productStyle = this.product.get('style').value;
    product.active = this.product.get('active').value;
    product.top = this.product.get('top').value;
    product.new_ = this.product.get('new_').value;
    product.sale = this.product.get('sale').value;

    product.images = this.product.get('images').value.map(imageStr => {
      return {
        imageId: null,
        imageUrl: imageStr
      }
    })
    product.createdAt = new Date();
    product.updatedAt = new Date();

    const productVariants: ProductVariant[] = this.variants.controls.map(variantForm => {
      return {
        productVariantId: variantForm.get('id').value,
        price: +variantForm.get('price').value,
        quantity: +variantForm.get('quantity').value,

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
    product.productVariants = productVariants;
    return product;
  }

}
