import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BazosService {
  private baseUrl = 'https://calm-plum-jaguar-tutu.cyclic.app/todos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
