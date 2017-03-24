import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-exclude',
	templateUrl: 'exclude.html'
})
export class ExcludePage {

	constructor(public navCtrl: NavController) {
		// TODO: Get this list from all recipes that use include ingredients - recipes with exclude ingredients - include ingredients
	}

}
