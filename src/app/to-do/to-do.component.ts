import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../shared/to-do.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  constructor(private toDoService: ToDoService, private msg: ToastrService) { }

  ngOnInit() {
    this.reset();
    this.toDoService.GetAllItemsInList();
  }

  reset(form?: NgForm) {
    if(form != null) form.resetForm(); 
    this.toDoService.itemInContext = {
      id: null,
      description: null,
      whenDate: null,
      timestamp: null
    };
  }

  formSubmit(form: NgForm) {
    let dataForm = form.value;
    // console.log(dataForm);

    if(!dataForm.id || dataForm.id == "") {
      delete this.toDoService.itemInContext.id;
    }

    this.toDoService.SaveItemInContext();
    this.reset(form);
    this.msg.success("Item salvo", "Coisas pra fazer");
  }

}
