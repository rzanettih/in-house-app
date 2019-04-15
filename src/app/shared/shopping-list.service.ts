import { Injectable } from '@angular/core';
import { ShoppingList, ShoppingListItemBought } from './shopping-list.model';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public itemInContext: ShoppingList;
  private _allItemsInList: ShoppingList[];

  public get allItemsInList() : ShoppingList[] {
    return this._allItemsInList;
  }

  private _shoppingListDBNode: string = "shopping-list";
  private _shoppingListBuyDBNode: string = "shopping-list-bought";

  constructor(private dataBase: AngularFirestore) { }

  public SaveItemInContext() {
    if(this.itemInContext && !this.itemInContext.id) {
      this.itemInContext.timestamp = new Date().getTime();
      this.itemInContext.addedDate = new Date().toDateString();
      this.dataBase.collection(this._shoppingListDBNode).add(this.itemInContext);
    }

    if(this.itemInContext && this.itemInContext.id) {
      let id = this.itemInContext.id;
      delete this.itemInContext.id;
      this.dataBase.doc(this._shoppingListDBNode + '/' + id).update(this.itemInContext);
    }
  }

  public GetAllItemsInList() : Promise<ShoppingList[]> {

    return new Promise(resolve => {
      this.dataBase.collection(this._shoppingListDBNode).snapshotChanges().subscribe(dbReturnArray => {
        this._allItemsInList = dbReturnArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as ShoppingList;
        });
      });

      resolve(this.allItemsInList);

    });
    

  }

  public DeleteItem(item: ShoppingList) {
    if(item)
      this.dataBase.doc(this._shoppingListDBNode + '/' + item.id).delete().then(() => {
        this.GetAllItemsInList();
      });
  }

  public BuyItem(item: ShoppingListItemBought) {
    if(item) {
      let itemId = item.id;
      delete item.id;
      item.buyDate = new Date().toDateString();
      this.dataBase.collection(this._shoppingListBuyDBNode).doc(itemId).set(item).then(yes => {
        let itemShopping = {id: itemId} as ShoppingList;
        this.DeleteItem(itemShopping);
      });
    }
  }
}
