import { Component } from '@angular/core';

@Component({
  selector: 'app-right-container',
  imports: [],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.scss'
})
export class RightContainerComponent {
  //variables to control tabs
  today:boolean = false;
  week:boolean = true;

  //variables to control metric values
  celsius:boolean = true;
  fahrenhiet:boolean = false;

  //functions to control tab values or tab states

  //function to click on tab today
  onTodayTabClick(){
    this.today = true;
    this.week = false;
  }

  //functiom to click on tab week
  onWeekTabClick(){
    this.today = false;
    this.week = true;
  }

  //functions to control metric values

  //function for click on celsius metric
  onCelsiusClick(){
    this.celsius = true;
    this.fahrenhiet = false;
  }

  //functions for click on fahrenhiet metric
  onFahrenheitClick(){
    this.celsius = false;
    this.fahrenhiet = true;
  }
}
