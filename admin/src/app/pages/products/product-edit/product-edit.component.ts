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
import { Product } from '../../../@core/models/product/product.model';
import { CustomValidator } from '../../../@core/validators/custom-validator';
import { ImagesCarouselComponent } from '../images-carousel.component';
import { ProductVariant } from '../../../@core/models/product/product-variant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { Image } from '../../../@core/models/Image';
import { forkJoin } from 'rxjs';

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

  edittingProduct: Product;
  edittingProductId: string;
  colors: ProductColor[];
  styles: ProductStyle[];
  categories: ProductCategory[];

  editProductFormGroup: FormGroup
  images: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: ProductCategoryService,
    private styleService: ProductStyleService,
    private productService: ProductService,
    private colorService: ProductColorService,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.settingFormGroup()
    this.activatedRoute.params.subscribe(
      params => {
        this.edittingProductId = params['id']
        this.productService.findById(+this.edittingProductId).subscribe(
          data => {
            this.edittingProduct = data[0] as Product;
          }
        )
      }
    )
  }

  get product() { return this.editProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.editProductFormGroup.controls["variants"] as FormArray }

  ngOnInit() {
    const category$ = this.categoryService.findAll();
    const style$ = this.styleService.findAll();
    const color$ = this.colorService.findAll();

    forkJoin([category$, style$, color$]).subscribe(
      ([categoryData, styleData, colorData]) => {
        this.categories = categoryData._embedded.categories;
        this.styles = styleData._embedded.productStyles;
        this.colors = colorData._embedded.productColors;

        this.fillFormValues();
      },
      error => {
        console.error(error);
      }
    );
  }

  fillFormValues(): void {
    // setting basic information
    this.product.get('id').setValue(this.edittingProduct.productId);
    this.product.get('name').setValue(this.edittingProduct.productName)
    this.product.get('category').setValue(this.edittingProduct.category.categoryName)
    this.product.get('style').setValue(this.edittingProduct.productStyle.styleName)
    this.product.get('description').setValue(this.edittingProduct.description)
    this.product.get('images').setValue(this.edittingProduct.images)

    let images: string[] = this.edittingProduct.images.map((img: Image) => {
      return this.utilsService.getImageFromBase64(img.imageUrl);
    })
    this.carousel.show(images);

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
      variantForm.get('size').setValue(variant.productSize)
      variantForm.get('quantity').setValue(variant.quantity)
      variantForm.get('price').setValue(variant.price)
      if (this.colorService.isBasicColor(variant.productColor)) {
        variantForm.get('colorType').setValue('Basic Color')
        variantForm.get('basicColorValue').setValue(variant.productColor.colorName)
      } else {
        variantForm.get('colorType').setValue('Custom Color')
        variantForm.get('customColorValue').setValue(variant.productColor.colorName)
      }
      if (variant.image != undefined) {
        variantForm.get('image').setValue(
          this.utilsService.getImageFromBase64(variant.image.imageUrl)
        )
      }
    }

  }

  settingFormGroup(): void {
    this.editProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        id: [],
        name: ['', [CustomValidator.notBlank, Validators.maxLength(200)]],
        category: [''],
        shape: [''],
        style: [''],
        description: ['', [CustomValidator.notBlank, Validators.maxLength(1000)]],
        images: [this.images] // Initialize with the array of URLs, e.g., this.urls is the array obtained from selectFile method
      }),
      variants: this.formBuilder.array([])
    })
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
      height: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      width: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      price: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      colorType: ['', [Validators.required]],
      basicColorValue: ['', [Validators.required]],
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
      if (group.get('colorType').value === 'Basic Color') {
        group.get('customColorValue').setErrors(null);
      }
      if (group.get('colorType').value === 'Custom Color') {
        group.get('basicColorValue').setErrors(null)
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
        this.router.navigate(['/admin/product/list'])
      } else {
        this.utilsService.updateToastState(new ToastState('Edit Product Failed!', "danger"))
      }
    })
  }

  mapFormValue(): Product {
    let editedProduct: any = new Product();
    editedProduct.productId = this.product.get('id').value;
    editedProduct.productName = this.product.get('name').value;
    editedProduct.description = this.product.get('description').value;
    editedProduct.isHide = false;
    editedProduct.categoryId = this.categories.find(cate => cate.categoryName == this.product.get('category').value).categoryId;
    editedProduct.productStyleId = this.styles.find(style => style.styleName == this.product.get('style').value).productStyleId;
    editedProduct.images = this.product.get('images').value
    editedProduct.createdAt = new Date();
    editedProduct.updatedAt = new Date();

    const productVariants: ProductVariant[] = this.variants.controls.map(variantForm => {
      return {
        productSize: variantForm.get('size').value,
        productVariantId: variantForm.get('id').value as number,
        price: variantForm.get('price').value as number,
        quantity: variantForm.get('quantity').value as number,
        productColor: variantForm.get('colorType').value == 'Basic Color' ?
          this.getColorValueFromType(variantForm.get('colorType').value, variantForm.get('basicColorValue').value) :
          this.getColorValueFromType(variantForm.get('colorType').value, variantForm.get('customColorValue').value),
        image: variantForm.get('image').value
      };
    });
    editedProduct.productVariants = productVariants;

    return editedProduct
  }

  getColorValueFromType(colorType, value): ProductColor {
    if (colorType == 'Basic Color') {
      return this.colors.find(color => color.colorName == value)
    } else {
      let newColor = new ProductColor();
      newColor.colorName = value
      return newColor;
    }
  }
}
