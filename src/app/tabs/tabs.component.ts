import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonicModule, RouterModule],
})
export class TabsComponent {}
