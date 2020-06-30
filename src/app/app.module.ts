import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {CoursesModule} from './courses/courses.module';
import {PipeSeparatedListComponent} from './component/pipe-separated-list/pipe-separated-list.component';

@NgModule({
    declarations: [
      AppComponent,
      PipeSeparatedListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        CoursesModule,
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
