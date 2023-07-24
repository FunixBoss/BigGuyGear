import { ProductCategory } from './../../../@core/models/product/product-category.model';
import { ProductCategoryService } from './../../../@core/services/product/product-category.service';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbAccordionItemComponent } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductShapeService } from '../../../@core/services/product/product-shape.service';
import { ProductStyleService } from '../../../@core/services/product/product-style.service';
import { ProductService } from '../../../@core/services/product/product.service';
import { ProductColorService } from '../../../@core/services/product/product-color.service';
import { ProductShape } from '../../../@core/models/product/product-shape.model';
import { ProductColor } from '../../../@core/models/product/product-color.model';
import { ProductStyle } from '../../../@core/models/product/product-style.model';
import { Product } from '../../../@core/models/product/product.model';
import { CustomValidator } from '../../../@core/validators/custom-validator';
import { ImagesCarouselComponent } from '../images-carousel.component';
import { ProductVariant } from '../../../@core/models/product/product-variant.model';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { Router } from '@angular/router';

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

  shapes: ProductShape[];
  colors: ProductColor[];
  styles: ProductStyle[];
  categories: ProductCategory[];

  // form chosen values
  addProductFormGroup: FormGroup
  descriptionContent: string;
  images: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: ProductCategoryService,
    private shapeService: ProductShapeService,
    private styleService: ProductStyleService,
    private productService: ProductService,
    private colorService: ProductColorService,
    private utilsService: UtilsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          this.categories = data
        }
      })
    this.shapeService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          this.shapes = data
        }
      })
    this.styleService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          this.styles = data
        }
      })
    this.colorService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          this.colors = data
        }
      })
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

  get product() { return this.addProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.addProductFormGroup.controls["variants"] as FormArray }

  addVariant(event?: Event): void {
    event != undefined ? event.preventDefault() : "";
    const variantForm = this.formBuilder.group({
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
    event.preventDefault()
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

    if (this.addProductFormGroup.invalid) {
      this.addProductFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('add', 'product', 'danger'))
      return;
    }

    const insertProduct: Product = this.mapFormValue()
    console.log(insertProduct);
    this.productService.insert(insertProduct).subscribe(data => {
      
      this.utilsService.updateToastState(new ToastState('add', 'product', 'success'))
      this.router.navigate(['/admin/product/list'])
    })
  }

  mapFormValue(): Product {
    let insertProduct: any = new Product();
    insertProduct.productName = this.product.get('name').value;
    insertProduct.description = this.product.get('description').value;
    insertProduct.isHide = false;
    insertProduct.categoryId = this.categories.find(cate => cate.categoryName = this.product.get('category').value).categoryId;
    insertProduct.productShapeId = this.shapes.find(shape => shape.shapeName = this.product.get('shape').value).productShapeId;
    insertProduct.productStyleId = this.styles.find(style => style.styleName = this.product.get('style').value).productStyleId;
    insertProduct.images = this.product.get('images').value
    insertProduct.createdAt = new Date();
    insertProduct.updatedAt = new Date();
    const productVariants: ProductVariant[] = this.variants.controls.map(group => {
      return {
        productVariantId: null,
        height: +group.get('height').value as number,
        width: +group.get('width').value as number,
        price: +group.get('price').value as number,
        quantity: +group.get('quantity').value as number,
        color: group.get('colorType').value == 'Basic Color' ?
          this.getColorValueFromType(group.get('colorType').value, group.get('basicColorValue').value) :
          this.getColorValueFromType(group.get('colorType').value, group.get('customColorValue').value),
        image: group.get('image').value
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

