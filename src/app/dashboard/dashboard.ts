import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  templateUrl: '../dashboard/dashboard.html'
})
export class Dashboard {


  constructor(private router: Router) { }

}
