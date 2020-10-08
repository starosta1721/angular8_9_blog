import { environment } from './../../environments/environment';
import { Post } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbCreateResponse } from '../../environments/interface';

@Injectable({providedIn: 'root'})

export class PostService {
    constructor(private http: HttpClient) {

    }
    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
        .pipe(map((response: FbCreateResponse) => {
            return {
                ...post,
                id: response.name,
                date: new Date(post.date)
            }
        }))
    }
}