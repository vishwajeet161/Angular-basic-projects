import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs';
import { EnvironmentVariables } from '../Environment/EnvironmentVariables';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  // Variables which will be filled by API Endpoints
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;

  //Variables that have the extracted data from the API Endpoint Variables
  temperatureData?: TemperatureData; // Left-container Data

  todayData?: TodayData;//Right-container Data
  weekData?: WeekData;// Right-container Data
  todaysHighlight?: TodaysHighlight;// Right-container Data

  constructor(private httpClient: HttpClient) {
    this.getData();
  }


  //Variables to be used for API call
  cityName: string = 'Pune';
  language: string = 'en-US';
  date: string = '20200622';
  units: string = 'm';


  getLocationDetails(cityName: string, language: string): Observable<LocationDetails> {
    return this.httpClient.get<LocationDetails>(EnvironmentVariables.weatherApiLocationBaseUrl, {
      headers: new HttpHeaders()
        .set(EnvironmentVariables.xRapidApiKeyName, EnvironmentVariables.xRapidApiKeyValue)
        .set(EnvironmentVariables.xRapidApiHostName, EnvironmentVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('query', cityName)
        .set('language', language)

    });
  }

  getWeatherReport(date: string, latitude: number, longitude: number, language: string, units: string): Observable<WeatherDetails> {
    return this.httpClient.get<WeatherDetails>(EnvironmentVariables.weatherApiForcastBaseUrl, {
      headers: new HttpHeaders()
        .set(EnvironmentVariables.xRapidApiKeyName, EnvironmentVariables.xRapidApiKeyValue)
        .set(EnvironmentVariables.xRapidApiHostName, EnvironmentVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('date', date)
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('language', language)
        .set('units', units)
    });
  }

  getData() {
    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (respose) => {
        this.locationDetails = respose;
        const latitude = this.locationDetails?.location.latitude[0];
        const longitude = this.locationDetails?.location.longitude[0];
  
        console.log("Location Details:", this.locationDetails);
  
        if (latitude !== undefined && longitude !== undefined) {
          this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
            next: (response) => {
              this.weatherDetails = response;
              console.log("Weather Details:", this.weatherDetails);
            },
            error: (err) => {
              console.error("Error fetching weather details:", err);
            }
          });
        } else {
          console.error("Latitude or Longitude is undefined");
        }
      },
      error: (err) => {
        console.error("Error fetching location details:", err);
      }
    });
  }
  
}
