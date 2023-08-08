import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider, testiSlider } from '../data';
import { ProductService } from 'src/app/shared/services/services/product/product.service';

@Component({
	selector: 'molla-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

	products = [];
	posts = [];
	loaded = false;
	introSlider = introSlider;
	brandSlider = brandSlider;
	testiSlider = testiSlider;

	constructor(public apiService: ApiService, public utilsService: UtilsService, private modalService: ModalService,private ProductService: ProductService) {
		this.modalService.openNewsletter();

		// this.apiService.fetchHomeData().subscribe(result => {
		// 	this.products = result.products;
		// 	this.posts = result.blogs;
		// 	this.loaded = true;
		// })
		this.ProductService.findAll().subscribe(
            x=>{
               this.products = x;
				this.loaded = true;
            }
           )
	}

	ngOnInit(): void {
	}
}
