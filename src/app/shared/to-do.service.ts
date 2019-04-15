import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToDo, ToDoDone } from './to-do.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private _allItemsInList: ToDo[];
  public get allItemsInList() : ToDo[] {
    return this._allItemsInList;
  }

  private _toDoDBNode: string = "to-do";
  public itemInContext: ToDo;

  constructor(private dataBase: AngularFirestore) { }

  public GetAllItemsInList() : Promise<ToDo[]> {

    return new Promise(resolve => {
      this.dataBase.collection(this._toDoDBNode).snapshotChanges().subscribe(dbReturnArray => {
        this._allItemsInList = dbReturnArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as ToDo;
        });
      });

      resolve(this.allItemsInList);

    });
    

  }

  public SaveItemInContext() {
    if(this.itemInContext && !this.itemInContext.id) {
      this.itemInContext.timestamp = new Date().getTime();
      this.dataBase.collection(this._toDoDBNode).add(this.itemInContext);
    }

    if(this.itemInContext && this.itemInContext.id) {
      let id = this.itemInContext.id;
      delete this.itemInContext.id;
      this.dataBase.doc(this._toDoDBNode + '/' + id).update(this.itemInContext);
    }
  }

  public DeleteItem(item: ToDo) {
    if(item)
      this.dataBase.doc(this._toDoDBNode + '/' + item.id).delete().then(() => {
        this.GetAllItemsInList();
      });
  }

  public Done(item: ToDoDone) {
    if(item) {
      let itemId = item.id;
      delete item.id;
      item.doneDate = new Date().toDateString();
      this.dataBase.collection(this._toDoDBNode).doc(itemId).set(item).then(yes => {
        let itemDone = {id: itemId} as ToDo;
        this.DeleteItem(itemDone);
      });
    }
  }

}
