import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { RecordListResponseDto } from '../models/response/RecordListResponseDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecordCreateRequest } from '../models/request/RecordCreateRequest';
import { Message } from '../models/Message';
import { RecordUpdateRequest } from '../models/request/RecordUpdateRequest';
import { FilterParamsRecordRequest } from '../models/request/FilterParamsRecordRequest';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private http = inject(HttpClient);
  constructor() { }

  baseUrl = environment.appExpenses;
  records = environment.services.records;

  listRecords(pageNo: number, pageSize: number){
    return this.http.get<RecordListResponseDto>(this.baseUrl.concat(this.records.listRecords
      .replace("#pageNo", String(pageNo))
      .replace("#pageSize", String(pageSize))
    ));
  }

  createRecord(recordCreateRequest: RecordCreateRequest){
    return this.http.post<void>(this.baseUrl.concat(this.records.create), recordCreateRequest);
  }

  deleteRecord(recordId: number){
    return this.http.delete<Message>(this.baseUrl.concat(this.records.deleteRecord.replace('#recordId', String(recordId))));
  }

  updateRecord(recordUpdateRequest: RecordUpdateRequest){
    return this.http.put<Message>(this.baseUrl.concat(this.records.updateRecord), recordUpdateRequest);
  }

  filterRecords(pageNo: number, pageSize: number, filterParams: FilterParamsRecordRequest){
    let params = new HttpParams();
    const iterableObject: { [key: string]: string | null } = { ...filterParams };
    
    for(const key in iterableObject){
      const paramValue = iterableObject[key];
      if (paramValue !== null){
        params = params.set(key, paramValue);
      }
    }

    return this.http.get<RecordListResponseDto>(this.baseUrl.concat(this.records.filterRecords
      .replace("#pageNo", String(pageNo))
      .replace("#pageSize", String(pageSize))
    ), { params: params})
  }
}
