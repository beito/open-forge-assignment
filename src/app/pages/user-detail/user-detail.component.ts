import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GitHubService } from '../../services/github.service';
import { GitHubUser } from '../../models/github-user.model';
import { Browser } from '@capacitor/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule],
})
export class UserDetailComponent implements OnInit {
  public searchTerm: string = '';
  public user!: GitHubUser;

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.searchTerm = username;
        this.searchUser();
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

  async openWebsite(url: string) {
    await Browser.open({ url });
  }
}