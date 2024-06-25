import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CategoryService } from '../../../services/category.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CategoryDto } from '../../../models/dto/CategoryDto';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableModule, IconFieldModule, InputIconModule, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './categoriesselect.component.html',
  styleUrl: './categoriesselect.component.scss'
})
export class CategoriesSelectComponent {
  categoriesList: CategoryDto[] = [];
  totalCategories: number = 0;
  visible: boolean = false;
  loading: boolean = true;
  pageNo: number = 0
  pageSize: number = 5;
  @Output() complete = new EventEmitter<{categoryId: number, categoryTitle: string}>();

  constructor(private categoryService: CategoryService, private messageService: MessageService){}

  loadData($event: TableLazyLoadEvent){
    this.loading = true;
    this.pageNo = ($event.first || 0) / this.pageSize
    this.categoryService.listCategories(this.pageNo, this.pageSize).subscribe({
      next: categories => {
        this.loading = false;
        this.categoriesList = categories.data.categories;
        this.totalCategories = categories.data.totalCategories;
      }
    });
  };

  selectCategory(categoryId: number, categoryTitle: string){
    this.visible = false;
    this.complete.emit({categoryId, categoryTitle});
  }
}
