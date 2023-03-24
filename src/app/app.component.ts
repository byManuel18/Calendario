import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Calendario';
  showLoading: boolean = false;
  $loadingSubscription: Subscription;
  constructor(
    private loadingService: LoadingService,
    private baseService: BaseService
  ){
    this.$loadingSubscription = this.loadingService.getSubscription().subscribe(canShow => this.showLoading = canShow);
  }

  ngOnDestroy(): void {
    if(this.$loadingSubscription){
      this.$loadingSubscription.unsubscribe();
     }
  }

  ngOnInit(): void {

    this.baseService.myGet('https://jsonplaceholder.typicode.com/posts',{}).then((data)=>{
      console.log(data);
    })
    this.baseService.myGet('https://jsonplaceholder.typicode.com/posts',{}).then((data)=>{
      console.log(data);
    })
    this.baseService.myGet('https://jsonplaceholder.typicode.com/posts',{}).then((data)=>{
      console.log(data);
    })
    this.baseService.myGet('https://jsonplaceholder.typicode.com/albums',{}).then((data)=>{
      console.log(data);
    })
    this.baseService.myGet('https://jsonplaceholder.typicode.com/posts',{}).then((data)=>{
      console.log(data);
    })
    this.baseService.myGet('https://jsonplaceholder.typicode.com/albums',{}).then((data)=>{
      console.log(data);
    })
    this.baseService.myGet('https://jsonplaceholder.typicode.com/photos',{}).then((data)=>{
      console.log(data);
    })

  }

  dateSelected!: Date;

  onSelectDate($event : Date){
    this.dateSelected = $event;
  }
}
