import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import this

@Component({
  selector: 'app-root',
  standalone: true, // If you're using standalone components
  imports: [RouterModule],  // Add RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'your-app';
}
