import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/HeaderComponent';
import { TableModule } from 'primeng/table';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserComponent,HeaderComponent,TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-AngularV17';
  products: any[];

  constructor() {
    this.products = [
      { code: '1', name: 'Product 1', category: 'Category 1', quantity: 10 },
      { code: '2', name: 'Product 2', category: 'Category 2', quantity: 20 },
      { code: '3', name: 'Larry', category: 'the Bird', quantity: 'twitter' }
    ];
  }
}
