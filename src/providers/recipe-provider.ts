import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecipeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecipeProvider {


	public recipes: any = [
		{
			"id" : 1,
			"name"  : "Herb Seasoned Baked Chicken",
			"ingredients" : [
				1,
				2,
				3,
				4,
				5,
				6,
				7
			],
			"steps" : [
				"Preheat oven to 400 degrees.",
				"Pat chicken dry.",
				"Rub chicken with a bit of salt, pepper, garlic, and oregano.",
				"Coat pan with cooking oil of choice.",
				"Arrange chicken on pan.",
				"Cook chicken for 30 minutes to brown the chicken.",
				"Set oven to 350 and continue cooking until juices run clear, or internal temperature is 170 degrees.",
				"Sprinkle some basil on top before serving.",
			]
		},
		{
			"id" : 2,
			"name"  : "Lightly Seasoned Baked Chicken",
			"ingredients" : [
				1,
				2,
				3,
				4,
			],
			"steps" : [
				"Preheat oven to 400 degrees.",
				"Pat chicken dry.",
				"Rub chicken with a bit of salt and pepper.",
				"Coat pan with cooking oil of choice.",
				"Arrange chicken on pan.",
				"Cook chicken for 30 minutes to brown the chicken.",
				"Set oven to 350 and continue cooking until juices run clear, or internal temperature is 170 degrees.",
			],
		},
		{
			"id" : 3,
			"name"  : "Simple Baked Chicken",
			"ingredients" : [
				1,
				2,
				3,
			],
			"steps" : [
				"Preheat oven to 400 degrees.",
				"Pat chicken dry.",
				"Rub chicken with a bit of salt.",
				"Coat pan with cooking oil of choice.",
				"Arrange chicken on pan.",
				"Cook chicken for 30 minutes to brown the chicken.",
				"Set oven to 350 and continue cooking until juices run clear, or internal temperature is 170 degrees.",
			],
		},
		{
			"id" : 4,
			"name"  : "Pecan Roasted Brussles",
			"ingredients" : [
				2,
				3,
				4,
				8,
				5,
				10,
				11
			],
			"steps" : [
				"Preheat oven to 350 degrees.",
				"Cover pan with aluminum foil",
				"Coat foil with cooking oil of choice.",
				"Arrange chopped pecans on foil-covered pan.",
				"Toast the pecans, but don't let them burn!",
				"Cut brussles in half, along the stem.",
				"Take pecans out, let cool for a minute.",
				"Again, coat the pan with cooking oil of choice.",
				"Toss brussles with oil, maple syrup, salt and pepper.",
				"Roast the brussles for 20 minutes or until golden brown in spots.",
				"Transfer to a serving dish, and top with nuts.",
			],
		},
	]

	constructor(public http: Http) {
	}


	/*
	*	Determines whether a recipe matches current filters
	*		@PARAM include (obj) = recipeProvider.include
	*		@PARAM exclude (obj) = recipeProvider.exclude
	*		@PARAM ingredients (array) = the array of ingredient IDs of a recipe
	*/
	recipeFilter(include, exclude, ingredients)
	{
		// Start true, as there may be nothing to loop through
		var addRecipe = true;

		// If include ingredeients listed, test those first
		if (include.length > 0) {

			// Do not add this recipe unless at least 1 include ingredient is found
			addRecipe = false;
			for(var key in include) {
				var ingredientId = include[key];

				if (!ingredients.includes(ingredientId)) {
					addRecipe = true;
					break;
				}
			}
		}

		// If the recipe isn't yet filted out, test for excluded ingredients
		if (addRecipe && exclude.length > 0) {

			// Do NOT add if at least 1 exclude ingredient found
			for(var key in exclude) {
				var ingredientId = exclude[key];

				// If excluded ingredients were found, do not add and break out of for-loop
				if (ingredients.includes(ingredientId)) {
					addRecipe = false;
					break;
				}
			}
		}

		// Add the recipe if applicable
		if (addRecipe) {
			return true;
		}

		// Otherwise return false
		return false;
	}


}
