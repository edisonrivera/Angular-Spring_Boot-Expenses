import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { CategoriesListResponseDto } from '../models/response/CategoriesListResponseDto';
import { Message } from '../models/Message';
import { CategoryCreateRequest } from '../models/request/CategoryCreateRequest';
import { CategoryUpdateRequest } from '../models/request/CategoryUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  constructor() { }

  baseUrl = environment.appExpenses;
  categories = environment.services.categories;

  listCategories(pageNo: number, pageSize: number){
    return this.http.get<CategoriesListResponseDto>(this.baseUrl.concat(this.categories.listCategories
      .replace("#pageNo", String(pageNo))
      .replace("#pageSize", String(pageSize))
    ));
  }

  deleteCategory(categoryId: number){
    return this.http.delete<Message>(this.baseUrl.concat(this.categories.deleteCategory
      .replace("#categoryId", String(categoryId))
    ));
  }

  createCategory(categoryCreateRequest: CategoryCreateRequest){
    return this.http.post<Message>(this.baseUrl.concat(this.categories.createCategory), categoryCreateRequest);
  }

  updateCategory(categoryUpdateRequest: CategoryUpdateRequest){
    return this.http.put<Message>(this.baseUrl.concat(this.categories.updateCategory), categoryUpdateRequest)
  }
}
