import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  name: string;
  link: string;
}
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // current year for footer display
  currentYear: number = new Date().getFullYear();

  public Products: NavLink[] = [
    { name: 'Features', link: '#' },
    { name: 'Templates', link: '#' },
    { name: 'AI Writer', link: '#' },
    { name: 'Pricing', link: '#' },
  ];
  public Companys: NavLink[] = [
    { name: 'About Us', link: '#' },
    { name: 'Blog', link: '#' },
    { name: 'Careers', link: '#' },
    { name: 'Contact', link: '#' },
  ];
  public Supports: NavLink[] = [
    { name: 'Help Center', link: '#' },
    { name: 'Terms of Service', link: '#' },
    { name: 'Legal', link: '#' },
    { name: 'Privacy Policy', link: '#' },
  ];
}
