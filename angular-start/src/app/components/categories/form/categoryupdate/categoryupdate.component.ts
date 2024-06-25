import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CategoryService } from '../../../../services/category.service';
import { TypeCategoryService } from '../../../../services/type-category.service';
import { ParameterModel } from '../../../../models/ParameterModel';
import { CategoryUpdateRequest } from '../../../../models/request/CategoryUpdateRequest';

@Component({
  selector: 'app-categoryupdate',
  standalone: true,
  imports: [FloatLabelModule, InputTextareaModule, ReactiveFormsModule, ButtonModule, TooltipModule, FormsModule, InputTextModule, DialogModule, 
    DropdownModule, ToastModule, TableModule, IconFieldModule, InputIconModule, DropdownModule],
  templateUrl: './categoryupdate.component.html',
  styleUrl: './categoryupdate.component.scss',
  providers: [MessageService, TypeCategoryService, CategoryService]
})
export class CategoryupdateComponent implements OnInit {
  visible: boolean = false;
  isNotFirstSaved: boolean = false;
  formUpdate!: FormGroup;
  typeCategoriesOptions: ParameterModel[] = [];
  @Output() complete = new EventEmitter<boolean>();

  @Input() recordId: number = 0;
  @Input() previousTitle: string = '';
  @Input() previuosIdType: number = 0;

  constructor(private messageService: MessageService, private typeCategoryService: TypeCategoryService, private categoryService: CategoryService){}

  ngOnInit(): void {
    this.formUpdate = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      typeId: new FormControl(undefined, [Validators.required])
    })

    this.typeCategoryService.listAllTypeCategories().subscribe({
      next: typeCategories => {
        this.typeCategoriesOptions = typeCategories.data.map((typeCategory: any) => ({
          id: typeCategory.id,
          value: typeCategory.name
        }));
      }
    })

    this.formUpdate.controls["title"].setValue(this.previousTitle);
    this.formUpdate.controls["typeId"].setValue(this.previuosIdType);
  }

  updateCategory(){
    if (this.formUpdate.invalid){
      this.messageService.add({ severity: 'error', summary: 'Category', detail: 'Verify All Data' });
      return;
    }

    this.isNotFirstSaved = true;

    const categoryUpdateRequest = new CategoryUpdateRequest();
    categoryUpdateRequest.id = this.recordId;
    categoryUpdateRequest.title = this.formUpdate.controls["title"].value;
    categoryUpdateRequest.typeId = this.formUpdate.controls["typeId"].value;

    this.categoryService.updateCategory(categoryUpdateRequest).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Category', detail: 'Updated successfully' });

        this.complete.emit(true);
        setTimeout(() => {
          this.visible = false;
        }, 500);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Category', detail: error.error.message });
        this.isNotFirstSaved = false;
      }
    })
  }
}
