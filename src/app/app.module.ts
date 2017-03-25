import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { RecipePage } from '../pages/recipe/recipe';
import { RecipesPage } from '../pages/recipes/recipes';
import { ExcludePage } from '../pages/exclude/exclude';
import { IncludePage } from '../pages/include/include';
import { TabsPage } from '../pages/tabs/tabs';

// DataProviders
import { IngredientsProvider } from '../providers/ingredients-provider';
import { RecipeProvider } from '../providers/recipe-provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		RecipePage,
		RecipesPage,
		ExcludePage,
		IncludePage,
		TabsPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		RecipePage,
		RecipesPage,
		ExcludePage,
		IncludePage,
		TabsPage
	],
	providers: [
		IngredientsProvider,
		RecipeProvider,
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}
