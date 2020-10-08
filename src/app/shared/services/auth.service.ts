import { FireBaseAuthResponse } from './../../../environments/interface';
import { environment } from './../../../environments/environment';
import { User } from './../interfaces';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {

    }
    get token(): string {
        const expDate = new Date(localStorage.getItem('fireBase-token-expires'));
        if ( new Date() > expDate ) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fireBase-token');
}

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        );
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;
        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('INVALID_EMAIL');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('INVALID_PASSWORD');

                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('EMAIL_NOT_FOUND');

                break;
        }
        return throwError(error);
    }

    private setToken(response: FireBaseAuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fireBase-token', response.idToken);
            localStorage.setItem('fireBase-token-expires', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
