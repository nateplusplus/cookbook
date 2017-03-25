import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe-provider';
import { IngredientsProvider } from '../../providers/ingredients-provider';

@Component({
	selector: 'page-recipe',
	templateUrl: 'recipe.html'
})
export class RecipePage {

	recipe : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public recipeProvider: RecipeProvider, public ingredientsProvider: IngredientsProvider) {

		for(var key in recipeProvider.recipes) {
			if (recipeProvider.recipes[key].id == navParams.get('id')) {
				this.recipe = recipeProvider.recipes[key];
			}
		}

		for(var key in this.recipe.ingredients) {
			for(var i in this.ingredientsProvider.ingredients) {
				var ingredient = this.ingredientsProvider.ingredients[i];
				if (ingredient.id == this.recipe.ingredients[key]) {
					this.recipe.ingredients[key] = ingredient;
				}
			}
		}
	}

}
