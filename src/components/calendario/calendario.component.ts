import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarioConfig, DayBuild } from 'src/interfaces/calendario.interface';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  @Input() configCalendar: CalendarioConfig;
  @Output() dateCliked = new EventEmitter<Date>();
  @Input() showNoClickableMonth : boolean = false;
  @Input() monthsToShow = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  daysOfMonthSelected: DayBuild[] = [];
  dateSelect!: Date;
  clikedDate!: DayBuild;



  constructor() {

    this.configCalendar = {
      daysWeek : ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      dateEndInterval: {
        day: 2,
        month: 12,
        year: 2023
      },
      dateInitialInterval: {
        day: 1,
        month: 1,
        year: 2022
      },
      // selectedDate:{
      //   day: 21,
      //   month: 12,
      //   year: 2022
      // }
    }

  }

  ngOnInit(): void {
    this.startCalendar();
  }

  startCalendar() {
    if(this.configCalendar.selectedDate){
      this.dateSelect = new Date(`${this.configCalendar.selectedDate.year}/${( this.configCalendar.selectedDate.month)}?${this.configCalendar.selectedDate.day}`);
      this.clikedDate = {
        value: this.dateSelect.getDate(),
        indexWeek: this.dateSelect.getDay(),
        year: this.configCalendar.selectedDate.year,
        month: this.configCalendar.selectedDate.month
      }
      this.getDaysFromSelectedMonth(this.configCalendar.selectedDate.year, this.configCalendar.selectedDate.month);
    }else{
      if(this.configCalendar.dateInitialInterval){
        this.dateSelect = new Date(`${this.configCalendar.dateInitialInterval.year}/${( this.configCalendar.dateInitialInterval.month)}?${this.configCalendar.dateInitialInterval.day}`);
        this.getDaysFromSelectedMonth(this.configCalendar.dateInitialInterval.year,this.configCalendar.dateInitialInterval.month);
      }else if(this.configCalendar.dateEndInterval){
        this.dateSelect = new Date(`${this.configCalendar.dateEndInterval.year}/${( this.configCalendar.dateEndInterval.month)}?${this.configCalendar.dateEndInterval.day}`);
        this.getDaysFromSelectedMonth(this.configCalendar.dateEndInterval.year,this.configCalendar.dateEndInterval.month);
      }else{
        const dateNow = new Date();
        this.dateSelect = dateNow;
        this.getDaysFromSelectedMonth(dateNow.getFullYear(),( dateNow.getMonth() + 1));
      }
    }
  }


  getDaysFromSelectedMonth (year: number, month:number){
    const daysMonth = new Date(year, month, 0).getDate();
    const arrayDays: DayBuild[] = Object.keys([...Array(daysMonth)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = new Date(`${year}-${month}-${a}`);
      return {
        value: a,
        indexWeek: dayObject.getDay(),
        year,
        month
      };
    });

    this.daysOfMonthSelected = arrayDays;
  }


  get canGoPrev() {
    if(this.showNoClickableMonth){
      return true;
    }
    const prevDate = new Date(this.dateSelect);
    prevDate.setMonth(prevDate.getMonth() - 1);

    if(!this.configCalendar.dateInitialInterval){
      return true;
    }else{
      const limitdateInitial = new Date(this.configCalendar.dateInitialInterval.year,this.configCalendar.dateInitialInterval.month - 2,this.configCalendar.dateInitialInterval.day);
      return !(limitdateInitial.getTime() >= prevDate.getTime());
    }

  }

  get canGoNext() {
    if(this.showNoClickableMonth){
      return true;
    }
    const nextDate =new Date(this.dateSelect);
    nextDate.setMonth(nextDate.getMonth() + 1);
    if(!this.configCalendar.dateEndInterval){
      return true;
    }else{
      const limitdateEnd = new Date(this.configCalendar.dateEndInterval.year,this.configCalendar.dateEndInterval.month - 1,this.configCalendar.dateEndInterval.day);
      return !(limitdateEnd.getTime() <= nextDate.getTime());
    }
  }


  clickDay(dayConfig: DayBuild) {
    const datepicker = new Date(this.dateSelect);
    datepicker.setDate(dayConfig.value);
    this.clikedDate = dayConfig;
    this.dateCliked.emit(datepicker);
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = new Date(this.dateSelect);
      prevDate.setMonth(prevDate.getMonth() - 1)
      this.dateSelect = prevDate;
      this.getDaysFromSelectedMonth(prevDate.getFullYear(), (prevDate.getMonth() + 1));
    } else {
      const nextDate =new Date(this.dateSelect);
      nextDate.setMonth(nextDate.getMonth() + 1)
      this.dateSelect = nextDate;
      this.getDaysFromSelectedMonth(nextDate.getFullYear(),  (nextDate.getMonth() + 1));
    }
  }

  getMonthName(index: number){
    return this.monthsToShow[index];
  }

  isDaySelected(configDay: DayBuild){
    if(this.clikedDate){
      return configDay.value == this.clikedDate.value && configDay.indexWeek == this.clikedDate.indexWeek && configDay.year == this.clikedDate.year && configDay.month == this.clikedDate.month;
    }else{
      return false;
    }
  }

  canClickDay(configDay:DayBuild){
    if(!this.configCalendar.dateInitialInterval && !this.configCalendar.dateEndInterval){
      return true;
    }else{
      let initialDateOk: boolean = false;
      let endDateOk: boolean = false;
      const datetoSelect = new Date(configDay.year,configDay.month - 1,configDay.value);

      if(this.configCalendar.dateInitialInterval){
        const limitdateInitial = new Date(this.configCalendar.dateInitialInterval.year,this.configCalendar.dateInitialInterval.month - 1,this.configCalendar.dateInitialInterval.day);
        initialDateOk = limitdateInitial.getTime() <= datetoSelect.getTime();
      }else{
        initialDateOk = true;
      }

      if(this.configCalendar.dateEndInterval){
        const limitdateEnd = new Date(this.configCalendar.dateEndInterval.year,this.configCalendar.dateEndInterval.month - 1,this.configCalendar.dateEndInterval.day);
        endDateOk = limitdateEnd.getTime() >= datetoSelect.getTime();
      }else{
        endDateOk = true;
      }
      return initialDateOk && endDateOk;
    }
  }

}
