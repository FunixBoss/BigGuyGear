import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { shopData } from '../../data';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categories } from '../../../../blog/shared/data';

@Component({
	selector: 'molla-shop-sidebar-one',
	templateUrl: './shop-sidebar-one.component.html',
	styleUrls: ['./shop-sidebar-one.component.scss']
})

export class ShopSidebarOneComponent implements OnInit {
	private apiUrl = 'http://localhost:9090/api/categories'; // URL API của danh mục
	getCategories(): Observable<any> {
		return this.x.get<any>(this.apiUrl);
	  }
	categories:any[];
	@Input() toggle = false;
	shopData = shopData;
	params = {};
	priceRange: any = [0, 100];

	@ViewChild('priceSlider') priceSlider: any;

	constructor(public activeRoute: ActivatedRoute, public router: Router , public x:HttpClient) {
		activeRoute.queryParams.subscribe(params => {
			this.params = params;
			console.log(params);
			
			if (params['minPrice'] && params['maxPrice']) {
				this.priceRange = [
					params['minPrice'] / 10,
					params['maxPrice'] / 10
				]
			} else {
				this.priceRange = [0, 100];
				
				if(this.priceSlider) {
					this.priceSlider.slider.reset({min: 0, max: 100});
				}
			}
		})
	}

	ngOnInit(): void {
		this.getCategories().subscribe(
			result => {
					this.categories = result._embedded.categories;
					console.log(this.categories);
					
					
					
			},
			error => {
			  console.log('Lỗi khi lấy dữ liệu từ API:', error);
			}
		  );;
		
	}

	containsAttrInUrl(type: string, value: string) {
		const currentQueries = this.params[type] ? this.params[type].split(',') : [];
		return currentQueries && currentQueries.includes(value);
	}

	getUrlForAttrs(type: string, value: string) {
		let currentQueries = this.params[type] ? this.params[type].split(',') : [];
		currentQueries = this.containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];
		return currentQueries.join(',');
	}

	onAttrClick(attr: string, value: string) {
		let url = this.getUrlForAttrs(attr, value);
		this.router.navigate([], { queryParams: { [attr]: this.getUrlForAttrs(attr, value), page: 1 }, queryParamsHandling: 'merge' });
	}

	filterPrice() {
		this.router.navigate([], { queryParams: { minPrice: this.priceRange[0] * 10, maxPrice: this.priceRange[1] * 10, page: 1 }, queryParamsHandling: 'merge' });
	}

	changeFilterPrice(value: any) {
		this.priceRange = [value[0], value[1]];
	}
}
