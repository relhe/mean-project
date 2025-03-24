import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
