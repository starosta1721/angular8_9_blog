import { FireBaseAuthResponse } from './../../../environments/interface';
import { environment } from './../../../environments/environment';
import { User } from './../interfaces';
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {

    }
    get token(): string {
    return ''
}

    login(user: User): Observable<any> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken)
        )
    }

    logout() {

    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private setToken(response: FireBaseAuthResponse) {
        console.log(response);
    }
}
