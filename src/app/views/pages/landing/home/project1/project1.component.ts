import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project1',
  templateUrl: './project1.component.html',
  styleUrls: ['./project1.component.scss']
})
export class Project1Component implements OnInit {

  constructor(private router:Router) { }


  ngOnInit() {

  }

  navigateToProject1Page() {
    console.log('Navigating to project1...');
    this.router.navigate(['home/project1']);
  }
}  
