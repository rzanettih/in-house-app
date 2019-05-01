import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CarMileageComponent } from './car-mileage/car-mileage.component';
import { ToDoComponent } from './to-do/to-do.component';
import { FixedCostsComponent } from './fixed-costs/fixed-costs.component';
import { ShoppingListService } from './shared/shopping-list.service';
import { FormsModule } from "@angular/forms";
import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';

import { CookieService } from 'ngx-cookie-service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ShoppingListComponent,
    CarMileageComponent,
    ToDoComponent,
    FixedCostsComponent,
    ShoppingListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.connConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule
  ],
  providers: [
    ShoppingListService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
