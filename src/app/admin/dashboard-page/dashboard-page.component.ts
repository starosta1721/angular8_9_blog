import { PostService } from './../../shared/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription
  constructor(private postsService: PostService) { 

  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe( posts => {
      this.posts = posts
    })
  }
  
  remove(id: string) {}
}
