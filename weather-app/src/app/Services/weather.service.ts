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
  temperatureData: TemperatureData = new TemperatureData(); // Left-container Data

  todayData?: TodayData;//Right-container Data
  weekData?: WeekData;// Right-container Data
  todaysHighlight?: TodaysHighlight;// Right-container Data


  //Variables to be used for API call
  cityName: string = 'Patna';
  language: string = 'en-US';
  date: string = '20200622';
  units: string = 'm';

  //Variables for current Time
  currentTime:Date;
  constructor(private httpClient: HttpClient) {
    this.getData();
  }

  getSummaryImage(summary: string): string{
    var baseAddress = "\\home\\vishwajeet161\\Desktop\\angular\\Angular-basic-projects\\weather-app\\public\\assets\\";
    var cloudySunny = "cloudy-sunny.png";
    var rainy = "rainy.png";
    var windy = "windy.png";
    var sunny = "sunny.png";
    var night = "night.png";
    var cloudy = "cloudy.png";
    var snow = "snow.png";
    var thunderstorm = "thunderstorm.png";
    return "";
  }

  //Method to create useful data chunks for UI using the data recieved from API
  prepareData():void {
    //Setting Left container Data Model Properties
    this.currentTime = new Date();
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.time = `${this.currentTime.getHours()}:${this.currentTime.getMinutes()}`;
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location = `${this.locationDetails.location.city[0]}, ${this.locationDetails.location.country[0]}`;
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseShort;
  }


  //Method to get the location details from the API using the variable cityName as the input
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

  //Method to get the weather details from the API using the variables date, latitude, longitude, language and units as the input
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
              // console.log("Weather Details:", this.weatherDetails);

              this.prepareData();
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
        // console.error("Error fetching location details:", err);
      }
    });
  }


}
