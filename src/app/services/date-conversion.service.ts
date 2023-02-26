import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateConversionService {

  constructor() { }

  convertCreationDate(date: Date | string | undefined): Date | string {
    const convertedDate=moment.utc(date).local().format('DD/MM/YY HH:mm:ss');
    return convertedDate;
  }
}
