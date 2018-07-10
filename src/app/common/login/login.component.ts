import { Component, OnInit } from '@angular/core';
import { BsModalRef ,BsModalService} from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  loginFail:boolean=false;
  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
      password: ['', Validators.required],
    });
  }
  loginUser(loginForm) {
    if (!loginForm.valid) {
      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      this.loading = true;
      const url = `http://139.162.53.4/netaji/oauth/token?client_id=finnov&client_secret=finnov&grant_type=password&password=${loginForm.value.password}&username=${loginForm.value.email}`;
      return this.http.get(url).subscribe(result => {
        window.localStorage.setItem('token', JSON.stringify({ result }));
        this.modalService.hide(1);
        this.loading = false;
        this.authService.setLoginStatus(true);
      }, error => {
        this.loading = false;
        this.loginFail= true;
      });
    }
  }
}
