import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, ViewChild, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { CustomStyleFilterActionsComponent } from "./custom/custom-style-filter-actions.component";
import { CustomStyleActionComponent } from "./custom/custom-style-action.component";
import { ProductStyleService } from "../../../@core/services/product/product-style.service";
import { ProductShapeService } from "../../../@core/services/product/product-shape.service";
import { CustomShapeFilterActionsComponent } from "./custom/custom-shape-filter-actions.component";
import { CustomShapeActionComponent } from "./custom/custom-shape-action.component";

@Component({
  selector: "ngx-product-style-shape",
  templateUrl: "./product-style-shape.component.html",
  styleUrls: ["./product-style-shape.component.scss"],
})
export class ProductStyleShapeComponent implements OnInit {
  state: string = "add"; // default
  private unsubscribe = new Subject<void>();

  // Setting for List layout
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  sourceStyle: LocalDataSource = new LocalDataSource();
  settingsStyle = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      columnTitle: ''
    },
    mode: "external", // when add/edit -> navigate to another url
    columns: {
      productStyleId: {
        title: "ID",
        type: "number",
      },
      styleName: {
        title: "Name",
        type: "string",
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: {
          type: 'custom',
          component: CustomStyleFilterActionsComponent
        },
        renderComponent: CustomStyleActionComponent
      }
    },
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };

  sourceShape: LocalDataSource = new LocalDataSource();
  settingsShape = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      columnTitle: ''
    },
    mode: "external", // when add/edit -> navigate to another url
    columns: {
      productShapeId: {
        title: "ID",
        type: "number",
      },
      shapeName: {
        title: "Name",
        type: "string",
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: {
          type: 'custom',
          component: CustomShapeFilterActionsComponent
        },
        renderComponent: CustomShapeActionComponent
      }
    },
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };

  constructor(
    private styleService: ProductStyleService,
    private shapeService: ProductShapeService,
  ) {
  }

  ngOnInit() {
    this.styleService.styleChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadStyles();
      });
    this.loadStyles()
    
    this.shapeService.shapeChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadShapes();
      });
    this.loadShapes()
  }

  loadStyles() {
    this.styleService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          this.sourceStyle.load(data);
        }
      })
  }

  loadShapes() {
    this.shapeService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          this.sourceShape.load(data);
        }
      })
  }

  changeCursor(): void {
    const element = document.getElementById("product-table");
    if (element) {
      element.style.cursor = "pointer";
    }
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.sourceStyle.setPaging(1, this.numberOfItem)
  }
}

