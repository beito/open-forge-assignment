import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

import { GitHubService } from '../../services/github.service';
import { GitHubUser } from '../../models/github-user.model';
import { HighlightReposDirective } from '../../directives/highlight-repos.directive';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HighlightReposDirective],
})
export class UserDetailComponent implements OnInit {
  public searchTerm: string = '';
  public user!: GitHubUser;

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.searchTerm = username;
        this.searchUser();
      }
    });

    this.routerOutlet.activateEvents.subscribe(() => {
      if (!this.route.snapshot.queryParams['username']) {
        this.clearSearch();
      }
    });
  }

  searchUser() {
    if (this.searchTerm.trim()) {
      this.githubService.getUserDetails(this.searchTerm).subscribe((data) => {
        this.user = data;
      });
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.user = undefined!;
  }

  async openWebsite(url: string) {
    await Browser.open({ url });
  }
}
