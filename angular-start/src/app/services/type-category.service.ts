import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { TypeCategoriesListResponseDto } from '../models/response/TypeCategoriesListResponseDto';

@Injectable({
  providedIn: 'root'
})
export class TypeCategoryService {
  private http = inject(HttpClient);

  constructor() { }

  baseUrl = environment.appExpenses;
  typeCategories = environment.services.typeCategories;

  listAllTypeCategories(){
    return this.http.get<TypeCategoriesListResponseDto>(this.baseUrl.concat(this.typeCategories.listTypeCategories));
  }
}
