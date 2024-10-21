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
  private nextID = 0;

  constructor(private githubService: GitHubService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?: any) {
    this.githubService.getUsers(this.nextID).subscribe((data) => {
      this.users = [...this.users, ...data];
      this.nextID = data[data.length - 1]?.id || this.nextID;
      if (event) {
        event.target.complete();
      }
    });
  }

  viewUserProfile(username: string) {
    this.router.navigate(['/user-detail', username]);
  }
}
