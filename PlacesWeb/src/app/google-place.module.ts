import { NgModule, ModuleWithProviders } from '@angular/core';
import { GoogleplaceDirective } from "./directives/googleplace.directive";

@NgModule({
	declarations: [GoogleplaceDirective],
	exports: [GoogleplaceDirective]
})
export class GooglePlaceModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: GooglePlaceModule
		}
	}
}
