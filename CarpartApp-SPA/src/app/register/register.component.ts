import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  prepareClient: any = {};
  
  regForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authServ: AuthService,
    public router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.regForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      confPass: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telNo: [''],
      city: [''],
      country: [''],
      postcode: [''],
      street: ['']
    }, {validator: this.matchValidator});

  }

  //customized validator
  matchValidator(care: FormGroup)
  {
    return care.get('password').value === care.get('confPass').value ? null:
    {
      'mismatch': true
    };
  }

  register()
  {
    if(this.regForm.valid)
    {
      this.prepareClient = Object.assign({}, this.regForm.value);
      this.authServ.register(this.prepareClient).subscribe(() => 
      {
        this.alertify.success("Registered successfully!");
      }, err => 
      {
        this.alertify.error(err);
      }, () => 
      {
        this.authServ.login(this.prepareClient).subscribe(() => {
          this.router.navigate(['/products']);
        })
      })
    }

    this.authServ.register(this.prepareClient)
  }
  cancel() {
    this.router.navigate(['/products']);
  }

}
