import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initAccordions, initFlowbite } from 'flowbite';
import { NgToastModule } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-toasty';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgToastModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'esolutions';

ngOnInit() {
  if (typeof document !== 'undefined') {
    initAccordions();
    initFlowbite();
  }
}
}
