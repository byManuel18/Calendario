import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

interface HttpOptions {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  } | undefined;
  params?: HttpParams | undefined;
}

interface ResponseKO {
  ok: false,
  msg?: string,
  status: number
}


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient,
  ) { }

  myPost<T extends Object, G extends Object> (url: string, body: G, options : HttpOptions) : Promise<T | null | ResponseKO> {
    return new Promise<T | null | ResponseKO>((resolve, reyect ) =>{
      this.http.post<T>(url,body,{headers: options.headers, params: options.params, observe: 'response'}).pipe(
        map<HttpResponse<T>,T | null | ResponseKO>((response)=>this.MapResponseOrError(response)),
        tap(value=> console.log(value))
        ).subscribe({
        next: (v) => resolve(v),
        error: (e: HttpErrorResponse) => reyect(e),
      });
    });
  }

  protected myPut<T extends Object,G extends Object>(url: string, body: G, options : HttpOptions) {
    return new Promise<T | null | ResponseKO>((resolve, reyect ) =>{
      this.http.put<T>(url,body,{headers: options.headers, params: options.params, observe: 'response'}).pipe(
        map<HttpResponse<T>,T | null | ResponseKO>((response)=>this.MapResponseOrError(response)),
        tap(value=> console.log(value))
        ).subscribe({
        next: (v) => resolve(v),
        error: (e: HttpErrorResponse) => reyect(e),
      });
    });
  }

  protected myDelete<T extends Object>(url: string, options : HttpOptions) {
    return new Promise<T | null | ResponseKO>((resolve, reyect ) =>{
      this.http.delete<T>(url,{headers: options.headers, params: options.params, observe: 'response'}).pipe(
        map<HttpResponse<T>,T | null | ResponseKO>((response)=>this.MapResponseOrError(response)),
        tap(value=> console.log(value))
        ).subscribe({
        next: (v) => resolve(v),
        error: (e: HttpErrorResponse) => reyect(e),
      });
    });
  }

  protected myGet<T extends Object> (url: string, options : HttpOptions) : Promise<T | null | ResponseKO> {
    return new Promise<T | null | ResponseKO>((resolve, reyect ) =>{
      this.http.get<T>(url,{headers: options.headers, params: options.params, observe: 'response'}).pipe(
        map<HttpResponse<T>,T | null | ResponseKO>((response)=>this.MapResponseOrError(response)),
        tap(value=> console.log(value))
        ).subscribe({
        next: (v) => resolve(v),
        error: (e: HttpErrorResponse) => reyect(e),
      });
    });
  }

  private MapResponseOrError<T extends Object>(response: HttpResponse<T>) : T | null | ResponseKO {
    if(response.status >= 200 && response.status < 300){
      return response.body;
    }else{
      const responseKo : ResponseKO = {
        ok: false,
        status: response.status,
        msg: response.statusText,
      }
      return responseKo;
    }
  }

}
