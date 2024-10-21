import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GitHubService } from '../../services/github.service';
import { GitHubUser } from '../../models/github-user.model';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class UserDetailComponent implements OnInit {
  public user!: GitHubUser;

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.githubService.getUserDetails(username).subscribe((data) => {
      this.user = data;
    });
  }

  async openWebsite(url: string) {
    await Browser.open({ url });
  }
}
