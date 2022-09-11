import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VacationSpot } from 'src/utils/vacationspot';
import { MessageService } from 'primeng/api';
import { VacationSpotService } from '../services/vacationspot.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
  `]
})
export class HomePage implements OnInit {
  date_to_visit: Date;
  location: string;

  vacation_spots: VacationSpot[]
  clonedVacationDetails: { [s: string]: VacationSpot; } = {};

  constructor(private vacationSpotsService: VacationSpotService, private messageService: MessageService, private changeDetect: ChangeDetectorRef) {}

  ngOnInit() {
    this.getVacationSpotsData()
  }

  onAdd() {
    this.vacationSpotsService.addVacationSpot(this.location, this.convertDateToFormatString(this.date_to_visit)).then(data => {
      this.getVacationSpotsData()
    })
    this.clearFields();
  }

  onDelete() {
    if (window.confirm("Do you really want to delete all vacation spots?")) {
      this.vacationSpotsService.deleteVacationSpots().then(data => {
        this.getVacationSpotsData()
      })
    }
  }

  onRowEditInit(vacation_spot: VacationSpot) {
    this.clonedVacationDetails[vacation_spot._id] = {...vacation_spot};
  }

  onRowEditSave(vacation_spot: VacationSpot) {
    this.vacationSpotsService.updateVacationSpot(vacation_spot).then(data => {
      this.getVacationSpotsData()
    })
    delete this.clonedVacationDetails[vacation_spot._id];
  }

  onRowEditCancel(vacation_spot: VacationSpot, index: number) {
    this.vacation_spots[index] = this.clonedVacationDetails[vacation_spot._id];
    delete this.clonedVacationDetails[vacation_spot._id];
  }

  clearFields() {
    this.location = ''
    this.date_to_visit = null
  }

  getVacationSpotsData() {
    this.vacationSpotsService.getVacationSpots().then(data => {
      console.log(data)
      this.vacation_spots = [...data];
    });
  }

  convertDateToFormatString(date: Date) {
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate()).padStart(2, '0');
    var yyyy = date.getFullYear();

    return (mm + '-' + dd + '-' + yyyy);
  }
}
