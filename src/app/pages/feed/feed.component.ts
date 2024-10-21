import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { loadUsers } from '../../store/users.actions';
import { Observable, take } from 'rxjs';
import { GitHubUser } from '../../models/github-user.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class FeedComponent implements OnInit {
  public users$: Observable<GitHubUser[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.users$ = this.store.select((state) => state.users.users);
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?: any) {
    this.store.dispatch(loadUsers());

    this.users$.pipe(take(1)).subscribe((data) => {
      if (event) {
        event.target.complete();
      }
    });
  }

  viewUserProfile(username: string) {
    this.router.navigate(['/tabs/user-detail'], {
      queryParams: { username },
    });
  }
}