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
  users: GitHubUser[] = [];

  constructor(private githubService: GitHubService, private router: Router) {}

  ngOnInit() {
    this.githubService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  viewUserProfile(username: string) {
    this.router.navigate(['/user-detail', username]);
  }
}
