import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../services/swaggerMovie/api.module';
import { BASE_PATH } from '../services/swaggerMovie/variables';
import { ApiModuleImdb } from '../services/swaggerImdb/api.module';
import { BASE_PATH_IMDB } from '../services/swaggerImdb/variables';
import { environment } from '../environments/environment';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule} from '@angular/material/sort'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
    ApiModuleImdb,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    ],
  providers: [
    {
      provide: BASE_PATH, useValue: environment.basePath
    },
    {
      provide: BASE_PATH_IMDB , useValue: environment.basePathImdb
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
