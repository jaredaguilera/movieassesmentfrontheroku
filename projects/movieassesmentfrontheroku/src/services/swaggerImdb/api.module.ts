import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { MovieControllerService } from './api/movieController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    MovieControllerService ]
})
export class ApiModuleImdb {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModuleImdb> {
        return {
            ngModule: ApiModuleImdb,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModuleImdb,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
