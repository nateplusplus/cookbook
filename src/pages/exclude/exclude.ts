import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IngredientsProvider } from '../../providers/ingredients-provider';

@Component({
	selector: 'page-exclude',
	templateUrl: 'exclude.html'
})
export class ExcludePage {

	list: Array<{id: number, name: string}>;

	constructor(public navCtrl: NavController, public ingredientsProvider: IngredientsProvider) {
		// TODO: Get this list from all recipes that use include ingredients - recipes with exclude ingredients - include ingredients
		this.list = [];
		for(var ingredient in ingredientsProvider.ingredients) {
			this.list.push({
				id : ingredientsProvider.ingredients[ingredient].id,
				name : ingredientsProvider.ingredients[ingredient].name
			});
		}
	}

	itemSelected(item) {
		console.log(item.name);

		// TODO: Create local storage "cupboard". Add included and excluded items to storage
		// TODO: Add recipes to dataProvider
		// TODO: Parse recipes for all ingredients instead of hardcoding here
	}

}