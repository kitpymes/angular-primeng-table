import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestFilterData } from './app.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  httpClient = inject(HttpClient);
  getData = (requestFilterData: RequestFilterData) =>
    this.httpClient.get<any>('assets/data.json').pipe(map(res => res.data.slice(requestFilterData.first, (requestFilterData.first + requestFilterData.rows))));
}
