import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-editresume',
  imports: [ButtonModule],
  templateUrl: './editresume.html',
  styleUrl: './editresume.css',
})
export class Editresume {
  resumeId: string | null = null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('id');
  }
}
