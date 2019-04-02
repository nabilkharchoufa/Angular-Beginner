import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from './user';

// si ça va être utiliser dans d'autre component il vaut mieux le faire dans une class apart
function ageRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}


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
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: '',
      email: '',
      phone: '',
      choiceAuth: 'email',
      age: [null, ageRange(0, 150)],
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

  authBy(choice: string): void {
    const phoneControl = this.userForm.get('phone');
    if (choice === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

}
