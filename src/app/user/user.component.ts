import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new User();
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: '',
      lastName: { value: 'N/A', disabled: true },
      email: '',
      sendCatalogue: true
    });
  }
  
  save() {
    console.log(this.userForm.value);
    console.log('Saved: ' + JSON.stringify(this.userForm.value));
  }

  setData() {
    this.userForm.patchValue({
      firstName: 'Ibrahim',
      lastName: 'Lebœuf',
      sendCatalogue: true
    });
  }

}
