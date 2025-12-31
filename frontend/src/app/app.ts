import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

import { Header } from '../app/layouts/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
