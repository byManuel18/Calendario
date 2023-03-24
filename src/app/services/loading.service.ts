import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private $showLoading = new BehaviorSubject<boolean>(false)

  constructor() {

   }

   showLoading(){
    this.$showLoading.next(true);
   }

   dismmissLoading(){
    this.$showLoading.next(false);
   }

   getSubscription(){
    return this.$showLoading;
   }
}
