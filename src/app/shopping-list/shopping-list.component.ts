import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shared/shopping-list.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from 'ngx-toastr';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  //TODO: Ter a possibilidade de adicionar um item que ja foi comprado no passado
  //TODO: Ver a lista de items ja comprados no passado

  constructor(private shoppingListService: ShoppingListService, private dataBase: AngularFirestore, private msg: ToastrService) { }

  ngOnInit() {
    this.reset();
    this.shoppingListService.GetAllItemsInList();
  }

  reset(form?: NgForm) {
    if(form != null) form.resetForm(); 
    this.shoppingListService.itemInContext = {
      id: null,
      itemDescription: null,
      addedDate: null,
      timestamp: null
    };
  }

  formSubmit(form: NgForm) {
    let dataForm = form.value;
    // console.log(dataForm);

    if(!dataForm.id || dataForm.id == "") {
      delete this.shoppingListService.itemInContext.id;
    }

    this.shoppingListService.SaveItemInContext();
    this.reset(form);
    this.msg.success("Item salvo", "Lista de compras");
  }

  onCancelEdit(form: NgForm) {
    this.reset(form);
  }

  onItemDelete(event: any) {
    console.log("Item delete: ");
    console.log(event);
    this.shoppingListService.DeleteItem(event);
    this.reset();
    this.msg.success("Item excluído", "Lista de compras");
  }

  onEditItem(event: any) {
    console.log("Item edit:");
    console.log(event);
    this.shoppingListService.itemInContext = Object.assign({}, event);
  }

  onItemBuy(event: any) {
    console.log("Item buy:");
    console.log(event);
    this.shoppingListService.BuyItem(event);
  }

  

}
