import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { MenuComponent } from '../menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { CategoryDto } from '../../models/dto/CategoryDto';
import { CategoryService } from '../../services/category.service';
import { MessageService } from 'primeng/api';
import { DialogService } from '../../services/dialog.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { CategoryformComponent } from './form/categoryform/categoryform.component';
import { RecordEnum } from '../../common/enums/RecordEnum';
import { TagModule } from 'primeng/tag';
import { CategoryupdateComponent } from './form/categoryupdate/categoryupdate.component';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../common/Constants';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MenuComponent, TableModule, ButtonModule, ToastModule, ToolbarModule, TooltipModule, TagModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [CategoryService, MessageService]
})
export class CategoriesComponent implements OnInit {
  categoriesList: CategoryDto[] = [];
  totalCategories: number = 0;
  pageNo: number = 0;
  pageSize: number = 5;
  loading: boolean = true;


  constructor(private categoryService: CategoryService, private dialogService: DialogService, private messageService: MessageService, 
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.titleService.setTitle(Constants.TITLE.concat("Categories"));
  }

  
  loadData($event: TableLazyLoadEvent) {
    this.loading = true;
    this.pageNo = ($event.first || 0) / this.pageSize
    this.categoryService.listCategories(this.pageNo, this.pageSize).subscribe({
        next: categories => {
          this.loading = false;
          this.categoriesList = categories.data.categories;
          this.totalCategories = categories.data.totalCategories;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Category', detail: "Error to list categories" });
        }
      }
    )
  }

  deleteCategory(categoryId: number){
    this.dialogService.showWarning("Are you sure to delete?", "Delete Category", true)
    .then(() => {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: message => {
          this.messageService.add({ severity: 'success', summary: 'Category', detail: message.message });
          this.loadData({first: this.pageNo * this.pageSize})
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Category', detail: error.error.message });
        }
      });
    })
  }

  getSeverity(type: string) {
    switch (type) {
      case RecordEnum.INCOME:
        return 'success';
      case RecordEnum.EXPENSE:
        return 'warning';
      default:
        return undefined;
    }
  }

  @ViewChild('dynamicFormCategory', {read: ViewContainerRef})
  public dynamicFormCategory!: ViewContainerRef;

  openDynamicFormCategory(): void{
    const dynamicComp = this.dynamicFormCategory.createComponent(CategoryformComponent).instance;
    if (dynamicComp){
      dynamicComp.visible = true;
      dynamicComp.complete.subscribe(complete => {
        if (complete){
          this.loadData({first: this.pageNo * this.pageSize});
        }
      })
    }
  }

  openDynamicFormUpdateRecord(categoryId: number): void{
    const dynamicComp = this.dynamicFormCategory.createComponent(CategoryupdateComponent).instance;
    if (dynamicComp){
      const categoryToUpdate = this.categoriesList.find(category => category.id === categoryId);
      
      if (!categoryToUpdate){
        this.messageService.add({ severity: 'error', summary: 'Category', detail: 'Category Not Found' })
        return;
      }

      dynamicComp.recordId = categoryToUpdate.id;
      dynamicComp.previousTitle = categoryToUpdate.title;
      dynamicComp.previuosIdType = categoryToUpdate.idType;

      
      dynamicComp.visible = true;
      dynamicComp.complete.subscribe(complete => {
        if (complete){
          this.loadData({first: this.pageNo * this.pageSize});
        }
      })
    }
  }
}
