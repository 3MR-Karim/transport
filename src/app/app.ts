import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login";

@Component({
  selector: 'app-root',
  standalone: true,                    
  imports: [RouterOutlet, LoginComponent],            
  templateUrl: './app.html',
  styleUrls: ['./app.scss']             
})
export class App {
  protected readonly title = signal('transport-minsitery');
}