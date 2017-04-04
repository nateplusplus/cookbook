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
		this.generateList();
	}

	itemSelected(item) {
		console.log("Open Recipe: "+item.name);
		this.navCtrl.push(RecipePage, {
			id: item.id,
		});
	}

	generateList()
	{
		var include = this.ingredientsProvider.include,
			exclude = this.ingredientsProvider.exclude,
			recipes = this.recipeProvider.recipes;

		// List all recipes that use include ingredients - recipes with exclude ingredients
		this.list = [];
		for(var recipe in recipes) {
			var recipeIngredients = recipes[recipe].ingredients

			// Loop through recipes and find the ones that aren't filted out
			if (this.recipeProvider.recipeFilter(include, exclude, recipeIngredients)) {
				this.list.push({
					id : recipes[recipe].id,
					name : recipes[recipe].name
				});
			}
		}
	}

	ionViewWillEnter() {
		this.generateList();
	}
}