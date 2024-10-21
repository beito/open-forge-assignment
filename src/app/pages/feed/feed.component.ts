import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GitHubService } from '../../services/github.service';
import { GitHubUser } from '../../models/github-user.model';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class FeedComponent implements OnInit {
  public users: GitHubUser[] = [];
  public hasMoreUsers = true;
  private nextID = 0;

  constructor(private githubService: GitHubService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?: any) {
    if (!this.hasMoreUsers) {
      if (event) {
        event.target.disabled = true;
      }
      return;
    }

    this.githubService.getUsers(this.nextID).subscribe(
      (data) => {
        if (data.length > 0) {
          this.users = [...this.users, ...data];
          this.nextID = data[data.length - 1].id;
        } else {
          this.hasMoreUsers = false;
        }

        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  viewUserProfile(username: string) {
    this.router.navigate(['/user-detail', username]);
  }
}
