import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { VacationSpot } from 'src/utils/vacationspot';

@Injectable({
  providedIn: 'root'
})
export class VacationSpotService {
  api_url = "https://ninaad-cs-4261-first.herokuapp.com/vacation-spots"
  api_url_for_post = "https://ninaad-cs-4261-first.herokuapp.com/vacation-spot"

  vacationSpots: VacationSpot[] = [
    {
      "_id": "1000",
      "location": "New York City, NY",
      "date_to_visit": "09-09-2022",
      "current_temperature": "It is currently 78 degrees."
    },
    {
      "_id": "1001",
      "location": "Mumbai, India",
      "date_to_visit": "11-09-2022",
      "current_temperature": "It is currently 88 degrees."
    }
  ]
  constructor(private http: HttpClient) { }

  getVacationSpots() {
    return this.http.get<any>(this.api_url)
        .toPromise()
        .then(res => <VacationSpot[]>res.data)
        .then(data => { return data; });
  }

  addVacationSpot(location: string, date_to_visit: string) {
    return this.http.post<any>(this.api_url_for_post, {body: {
      'location': location,
      'date_to_visit': date_to_visit
    }}).toPromise()
  }

  updateVacationSpot(vacationSpot: VacationSpot) {
    return this.http.put<any>(this.api_url, {body: {
      'location': vacationSpot.location,
      'date_to_visit': vacationSpot.date_to_visit,
      '_id': vacationSpot._id
    }}).toPromise()
  }

  deleteVacationSpots() {
    return this.http.delete(this.api_url).toPromise()
  }
}
