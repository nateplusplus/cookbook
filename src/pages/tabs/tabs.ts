import { Component } from '@angular/core';

import { IncludePage } from '../include/include';
import { ExcludePage } from '../exclude/exclude';
import { RecipesPage } from '../recipes/recipes';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = IncludePage;
	tab2Root: any = ExcludePage;
	tab3Root: any = RecipesPage;

	constructor() {

	}
}
