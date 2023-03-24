import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../app/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor{

  urlsToShow: string[] =[
    'todos',
    'posts',
    'photos',
  ]

  constructor(
    private loadingService : LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.canShow(req.url)){
      this.loadingService.showLoading();
    }
    return next.handle(req).pipe(
      finalize(()=>{
        if(this.canShow(req.url)){
          this.loadingService.dismmissLoading();
        }
      })
    )
  }

  canShow(url:string):boolean{
    return !!this.urlsToShow.find(u => url.includes(u));
  }
}
