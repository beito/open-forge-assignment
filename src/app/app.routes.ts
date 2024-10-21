import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/feed', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'feed', loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent) },
      { path: 'user-detail', loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent) },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  },
];
