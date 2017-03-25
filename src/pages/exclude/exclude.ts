import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IngredientsProvider } from '../../providers/ingredients-provider';
import { RecipeProvider } from '../../providers/recipe-provider';

@Component({
	selector: 'page-exclude',
	templateUrl: 'exclude.html'
})
export class ExcludePage {

	list: Array<{id: number, name: string}>;

	constructor(public navCtrl: NavController, public ingredientsProvider: IngredientsProvider, public recipeProvider: RecipeProvider) {

		// TODO: Don't show ingredients already selected to include

		// Generate list of ingredients based on recipes that have not yet been filtered out
		this.generateList();
	}


	/*
	*	Generates a list of ingredients based on user's other selections
	*		1) Don't show ingredients from recipes that contain excluded ingredients
	*		2) Don't show ingredients already selected to include
	*/
	generateList() {

		var ingredientIds = new Array();

		// Get all recipes that don't use exclude ingredients
		for(var recipe in this.recipeProvider.recipes)
		{

			// Loop through recipes and find the ones that aren't filted out yet
			var addRecipe = this.recipeProvider.recipeFilter(this.ingredientsProvider.include, this.ingredientsProvider.exclude, this.recipeProvider.recipes[recipe].ingredients);

			// Now if both tests passed, add it!
			if (addRecipe) {

				// Add the recipe ingredients if not already added
				for(key in this.recipeProvider.recipes[recipe].ingredients) {
					var ingredientId = this.recipeProvider.recipes[recipe].ingredients[key];
					if (ingredientIds.indexOf(ingredientId) == -1) {
						ingredientIds.push(ingredientId);
					}
				}
			}
		}

		this.list = [];
		for(var key in this.ingredientsProvider.ingredients) {
			var ingredient = this.ingredientsProvider.ingredients[key];

			// Continue if this ingredient is on the ingredientIds array
			if (ingredientIds.indexOf(ingredient.id) > -1) {

				// Add it if it's not on the "include" list
				if (this.ingredientsProvider.include.indexOf(ingredient.id) == -1) {
					this.list.push({
						id : this.ingredientsProvider.ingredients[key].id,
						name : this.ingredientsProvider.ingredients[key].name
					});
				}
			}
		}
	}

	itemSelected(item) {
		console.log("removing "+item.name);
		this.ingredientsProvider.exclude.push(item.id);
		this.generateList();
	}

}
