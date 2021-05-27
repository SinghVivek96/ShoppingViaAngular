import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exit } from 'process';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  seconds : number =5;
  constructor(private router: Router) {
    
  }

  startCountdown() {
    let counter = this.seconds;
      
    const interval = setInterval(() => {
      this.seconds--;
      counter--;
      // console.log(this.seconds);
      if (counter <= 0 ) {
        localStorage.removeItem('orderId');
        this.router.navigate(['/']);
        clearInterval(interval);
      }
    }, 1000);
  }  

  ngOnInit() {
    let orderId = localStorage.getItem('orderId');
    if(orderId)
      this.startCountdown();
    else
      this.router.navigate(['/']);
  }
}
