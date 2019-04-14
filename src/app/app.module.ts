import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CarMileageComponent } from './car-mileage/car-mileage.component';
import { ToDoComponent } from './to-do/to-do.component';
import { FixedCostsComponent } from './fixed-costs/fixed-costs.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ShoppingListComponent,
    CarMileageComponent,
    ToDoComponent,
    FixedCostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.connConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
