import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GitHubService } from '../../services/github.service';
import { GitHubUser } from '../../models/github-user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class FeedComponent implements OnInit {
  users: GitHubUser[] = [];

  constructor(
    private githubService: GitHubService
  ) {}

  ngOnInit() {
    this.githubService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

}
