import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';



import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    InputTextModule,
    CalendarModule,
    CardModule,
    TableModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
