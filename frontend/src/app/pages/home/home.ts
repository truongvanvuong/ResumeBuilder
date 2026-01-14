import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Footer } from '../../layouts/footer/footer';
import { User } from '../../services/user';
interface cardItem {
  icon: string;
  classname: string;
  title: string;
  description: string;
}
interface imgItems {
  name: string;
}
@Component({
  selector: 'app-home',
  imports: [Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public cardItems: cardItem[] = [
    {
      icon: 'pi pi-pen-to-square',
      classname: 'bg-primary/10 text-primary hover:bg-primary',
      title: 'Fluid Workflow',
      description:
        'Intelligent interface adapts to your input, making complex CV construction feel effortless.',
    },
    {
      icon: 'pi pi-shield',
      classname: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500',
      title: 'ATS Core',
      description:
        'Advanced parsing algorithms ensure your professional data remains structured and machine-readable.',
    },
    {
      icon: 'pi pi-palette',
      classname: 'bg-blue-500/10 text-purple-500 hover:bg-purple-500',
      title: 'Design Systems',
      description:
        'Templates built on professional design principles for unparalleled visual impact and clarity.',
    },
  ];
  public imgItems: imgItems[] = [
    { name: 'logo-deloitte.webp' },
    { name: 'logo-google.webp' },
    { name: 'logo-lowes.webp' },
    { name: 'logo-state-farm.webp' },
    { name: 'logo-unilever.webp' },
  ];

  constructor(private router: Router, private userService: User) {}
  handleGetStarted() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home'], { queryParams: { login: '1' } });
    }
  }
}
