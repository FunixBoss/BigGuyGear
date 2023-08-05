import { Component, OnInit, Input } from '@angular/core';
import { productSlider } from '../data';

@Component({
	selector: 'molla-top-collection',
	templateUrl: './top-collection.component.html',
	styleUrls: ['./top-collection.component.scss']
})

export class TopCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;
	sliderOption = productSlider;

	categories = [['women'], ['men']];
	titles = { "women": "Women's Clothing", "men": "Men's Clothing" };

	constructor() { }

	ngOnInit(): void {
	}
}
