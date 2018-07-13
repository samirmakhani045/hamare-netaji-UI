import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getProfileByName(name): Observable<any> {

        const URL = "http://139.162.53.4/netaji/client/searchProfile?keyword=" + name;
        return this.httpClient.get(URL, { observe: 'response' })
            .pipe(map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}
