import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';



@Component({
  selector: 'app-right-container',
  imports: [NgIf, FontAwesomeModule, NgFor],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.scss'
})
export class RightContainerComponent {

  constructor(public weatherService: WeatherService) { }

  //variables for thumbs up and thumbs down icons face smile and face frowned
  faThumbsUp: any  = faThumbsUp;
  faThumbsDown: any  = faThumbsDown;
  faFaceSmile: any = faFaceSmile;
  faFaceFrown: any = faFaceFrown;

  // //variables to control tabs
  // today:boolean = false;
  // week:boolean = true;

  // //variables to control metric values
  // celsius:boolean = true;
  // fahrenhiet:boolean = false;

  //functions to control tab values or tab states

  //function to click on tab today
  onTodayTabClick(){
    this.weatherService.today = true;
    this.weatherService.week = false;
  }

  //functiom to click on tab week
  onWeekTabClick(){
    this.weatherService.today = false;
    this.weatherService.week = true;
  }

  //functions to control metric values

  //function for click on celsius metric
  onCelsiusClick(){
    this.weatherService.celsius = true;
    this.weatherService.fahrenhiet = false;
  }

  //functions for click on fahrenhiet metric
  onFahrenheitClick(){
    this.weatherService.celsius = false;
    this.weatherService.fahrenhiet = true;
  }
}
