import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import{AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  signing: boolean = false;
  signinFail:boolean = false;
  constructor(public bsModalRef: BsModalRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.RegisterForm = this.formBuilder.group({
      sal: ['Mr.', Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
      mobile: [null, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      password: [null, Validators.required]
    });
  }
  registerUser(RegisterForm) {
    if (!RegisterForm.valid) {
      Object.keys(RegisterForm.controls).forEach(field => {
        const control = RegisterForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {

      this.signing = true;
      let options =  { };
      this.http.post('http://139.162.53.4/netaji/account/create', RegisterForm.value,options)
        .subscribe((res) => {
          console.log(res);
          this.loginAPi();
          this.signing = false;
          this.modalService.hide(1);
        }, err => {
          this.signing = false;
          this.signinFail = true;
        });

    }
  }
  loginAPi(){
    console.log(this.RegisterForm);
    const url = `http://139.162.53.4/netaji/oauth/token?client_id=finnov&client_secret=finnov&grant_type=password&password=${this.RegisterForm.value.password}&username=${this.RegisterForm.value.email}`;
    return this.http.get(url).subscribe(result => {
      window.localStorage.setItem('token', JSON.stringify({ result }));
      
      this.authService.setLoginStatus(true);
    }, error => {
      
    });
  }
}
