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
	generateList()
	{

		var ingredientIds = new Array(),
			include = this.ingredientsProvider.include,
			exclude = this.ingredientsProvider.exclude,
			recipes = this.recipeProvider.recipes,
			allIngredients = this.ingredientsProvider.ingredients;

		// Get all recipes that don't use exclude ingredients
		for(var recipe in recipes)
		{
			var recipeIngredients = recipes[recipe].ingredients;

			// Loop through recipes and find the ones that aren't filted out yet
			if (this.recipeProvider.recipeFilter(include, exclude, recipeIngredients)) {

				// Add the recipe ingredients if not already added
				for(key in recipeIngredients) {
					var ingredientId = recipeIngredients[key];
					if (ingredientIds.indexOf(ingredientId) == -1) {
						ingredientIds.push(ingredientId);
					}
				}
			}
		}

		this.list = [];
		for(var key in allIngredients) {
			var ingredient = allIngredients[key];

			// Continue if this ingredient is on the ingredientIds array
			if (ingredientIds.indexOf(ingredient.id) > -1) {

				// Add it if it's not on the "include" list
				if (include.indexOf(ingredient.id) == -1) {
					this.list.push({
						id : allIngredients[key].id,
						name : allIngredients[key].name
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

	ionViewWillEnter() {
		this.generateList();
	}

}
