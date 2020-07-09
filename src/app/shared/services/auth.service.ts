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
        user.returnSecureToken = true;
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
        const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
        localStorage.setItem('fireBase-token', response.idToken)
        localStorage.setItem('fireBase-token-expires', expDate.toString())
    }
}
