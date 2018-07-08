import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private subject = new Subject<any>();

    setLoginStatus(message: boolean) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getLoginStatus(): Observable<any> {
        return this.subject.asObservable();
    }
}