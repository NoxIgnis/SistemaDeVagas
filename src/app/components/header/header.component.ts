import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
type localVariants = 'retangulo-head' | '';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() login: boolean = false;
  @Input() variant: localVariants = 'retangulo-head';

  constructor(private router: Router) {
    this.login = this.router.url == '/login'; // Atribui a URL atual a uma variável
  }
}
