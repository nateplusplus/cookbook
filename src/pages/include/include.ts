import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IngredientsProvider } from '../../providers/ingredients-provider';
import { RecipeProvider } from '../../providers/recipe-provider';

@Component({
	selector: 'page-include',
	templateUrl: 'include.html'
})
export class IncludePage {

	list: Array<{ id: number, name: string }>;

	constructor(public navCtrl: NavController, public ingredientsProvider: IngredientsProvider, public recipeProvider: RecipeProvider) {

		// TODO: remove items that are excluded and remove items as they are clicked
		this.generateList();

	}

	itemSelected(item) {
		this.ingredientsProvider.include.push(item.id);
		this.generateList();
	}



	/*
	*	Generates a list of ingredients based on user's other selections
	*		1) Don't show excluded ingredients
	*		2) Don't show ingredients already selected to include
	*/
	generateList() {

		this.list = [];
		for (var key in this.ingredientsProvider.ingredients) {
			var ingredient = this.ingredientsProvider.ingredients[key],
				addIngredient = true;

			if (this.ingredientsProvider.include.indexOf(ingredient.id) > -1) {
				addIngredient = false;
			}
			else if (this.ingredientsProvider.exclude.indexOf(ingredient.id) > -1) {
				addIngredient = false;
			}

			// Add it if it passes both requirements
			if (addIngredient) {
				this.list.push({
					id: this.ingredientsProvider.ingredients[key].id,
					name: this.ingredientsProvider.ingredients[key].name
				});
			}
		}
	}

	ionViewWillEnter() {
		this.generateList();
	}

}