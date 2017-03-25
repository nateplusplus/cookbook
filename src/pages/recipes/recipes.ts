import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { IngredientsProvider } from '../../providers/ingredients-provider';
import { RecipeProvider } from '../../providers/recipe-provider';

@Component({
	selector: 'page-recipes',
	templateUrl: 'recipes.html'
})
export class RecipesPage {

	list: Array<{id: number, name: string}>;

	constructor(public navCtrl: NavController, public recipeProvider: RecipeProvider, public ingredientsProvider: IngredientsProvider) {

		// List all recipes that use include ingredients - recipes with exclude ingredients
		this.list = [];
		for(var recipe in recipeProvider.recipes) {

			// Loop through recipes and find the ones that aren't filted out
			var addRecipe = recipeProvider.recipeFilter(this.ingredientsProvider.include, this.ingredientsProvider.exclude, recipeProvider.recipes[recipe].ingredients);

			// Add the recipe if applicable
			if (addRecipe) {
				this.list.push({
					id : recipeProvider.recipes[recipe].id,
					name : recipeProvider.recipes[recipe].name
				});
			}
		}
	}

	itemSelected(item) {
		console.log("Open Recipe: "+item.name);
	}

}