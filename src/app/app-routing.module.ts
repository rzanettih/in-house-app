import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CarMileageComponent } from './car-mileage/car-mileage.component';
import { FixedCostsComponent } from './fixed-costs/fixed-costs.component';
import { ToDoComponent } from './to-do/to-do.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: 'car-mileage',
    component: CarMileageComponent
  },
  {
    path: 'fixed-costs',
    component: FixedCostsComponent
  },
  {
    path: 'to-do',
    component: ToDoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
