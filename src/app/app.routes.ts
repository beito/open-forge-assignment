import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  { path: 'user-detail', component: UserDetailComponent },
];
