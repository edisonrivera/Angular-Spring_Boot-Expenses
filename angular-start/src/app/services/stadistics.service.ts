import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { BalancesResponseDto } from '../models/response/BalancesResponseDto';
import { StadisticRecordResponseDto } from '../models/response/StadisticRecordResponseDto';
import { StadisticWeekRecordResponseDto } from '../models/response/StadisticWeekRecordResponseDto';

@Injectable({
  providedIn: 'root'
})
export class StadisticsService {

  private http = inject(HttpClient);

  constructor() { }

  baseUrl = environment.appExpenses;
  stadistics = environment.services.stadistics;

  getBalances(){
    return this.http.get<BalancesResponseDto>(this.baseUrl.concat(this.stadistics.balances));
  }

  getAmounts(){
    return this.http.get<StadisticRecordResponseDto>(this.baseUrl.concat(this.stadistics.amounts));
  }

  getExpenses(){
    return this.http.get<StadisticRecordResponseDto>(this.baseUrl.concat(this.stadistics.expenses));
  }

  getWeekAmounts(date: string){
    const params = new HttpParams().set("date", date)
    return this.http.get<StadisticWeekRecordResponseDto>(this.baseUrl.concat(this.stadistics.amountsWeek), {params: params})
  }

  getExpensesAmounts(date: string){
    const params = new HttpParams().set("date", date);
    return this.http.get<StadisticWeekRecordResponseDto>(this.baseUrl.concat(this.stadistics.expensesWeek), {params: params})
  }
}
