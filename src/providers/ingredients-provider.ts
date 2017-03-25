import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
	Generated class for the IngredientsProvider provider.

	See https://angular.io/docs/ts/latest/guide/dependency-injection.html
	for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IngredientsProvider {

	public ingredients: any = [
		{
			"id" : 1,
			"name" : "Chicken",
		},
		{
			"id" : 2,
			"name" : "Cooking Oil"
		},
		{
			"id" : 3,
			"name" : "Salt",
		},
		{
			"id" : 4,
			"name" : "Black Pepper",
		},
		{
			"id" : 5,
			"name" : "Garlic",
		},
		{
			"id" : 6,
			"name" : "Oregano",
		},
		{
			"id" : 7,
			"name" : "Basil",
		},
		{
			"id" : 8,
			"name" : "Brussle Sprouts",
		},
		{
			"id" : 9,
			"name" : "Garlic",
		},
		{
			"id" : 10,
			"name" : "Chopped Pecans",
		},
		{
			"id" : 11,
			"name" : "Mapel Syrup",
		},
		{
			"id" : 12,
			"name" : "Salmon",
		},
		{
			"id" : 13,
			"name" : "Onion Powder",
		},
		{
			"id" : 14,
			 "name" : "Butter",
		},
		{
			"id" : 15,
			 "name" : "Ham Steak",
		},
		{
			"id" : 16,
			 "name" : "Pineapple Rings",
		},
		{
			"id" : 17,
			 "name" : "Bell Pepper",
		},
		{
			"id" : 18,
			 "name" : "Brown Sugar",
		},
		{
			"id" : 19,
			 "name" : "Mustard",
		},
		{
			"id" : 20,
			 "name" : "Onion",
		},
		{
			"id" : 21,
			 "name" : "Zucchini",
		},
		{
			"id" : 22,
			"name" : "Snow Peas",
		},
		{
			"id" : 23,
			"name" : "Carrots",
		},
		{
			"id" : 24,
			"name" : "Curry Sauce",
		},
		{
			"id" : 25,
			"name" : "Potatos",
		},
		{
			"id" : 26,
			"name" : "Thyme",
		},
		{
			"id" : 27,
			"name" : "Rosemary",
		}
	]

	constructor(public http: Http) {
	}


}
