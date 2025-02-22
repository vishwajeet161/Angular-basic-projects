import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';



@Component({
  selector: 'app-left-container',
  imports: [FontAwesomeModule],
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.scss'
})
export class LeftContainerComponent {
  //Variables for font awesome icons

  //Variables for left-nav-bar search icons
  faMagnifyingGlass:any = faMagnifyingGlass;
  faLocation:any = faLocation;

  //Variables for temperature summary icons
  faCloud:any = faCloud;
  faCloudRain:any = faCloudRain;

  constructor( public weatherService: WeatherService) { }
  onSearch(location: string){
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}
