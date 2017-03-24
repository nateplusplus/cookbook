import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-include',
	templateUrl: 'include.html'
})
export class IncludePage {

	items: Array<{title: string}>;

	constructor(public navCtrl: NavController) {

		this.items = [
			{
				"title": "Apples",
			},
			{
				"title": "Chicken",
			},
			{
				"title": "Peppers",
			},
			{
				"title": "Onions",
			},
		];

	}

	itemSelected(item) {
		console.log(item.title);

		// TODO: Create local storage "cupboard". Add included and excluded items to storage
		// TODO: Add recipes to dataProvider
		// TODO: Parse recipes for all ingredients instead of hardcoding here
	}

}