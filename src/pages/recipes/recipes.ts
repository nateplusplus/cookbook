import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-recipes',
	templateUrl: 'recipes.html'
})
export class RecipesPage {

	constructor(public navCtrl: NavController) {
		// TODO: List all recipes that use include ingredients - recipes with exclude ingredients
	}

}
