import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        routerLink: '/categories'
      },
      {
        label: 'Records',
        icon: 'pi pi-money-bill',
        routerLink: '/records'
      },
      {
        label: 'Historial',
        icon: 'pi pi-star',
        routerLink: '/historial'
      }
    ]
  }
}
