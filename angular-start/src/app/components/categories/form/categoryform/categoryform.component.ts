import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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
import { ParameterModel } from '../../../../models/ParameterModel';
import { TypeCategoryService } from '../../../../services/type-category.service';
import { CategoryCreateRequest } from '../../../../models/request/CategoryCreateRequest';
import { CategoryService } from '../../../../services/category.service';


@Component({
  selector: 'app-categoryform',
  standalone: true,
  imports: [FloatLabelModule, InputTextareaModule, ReactiveFormsModule, ButtonModule, TooltipModule, FormsModule, InputTextModule, DialogModule, 
    DropdownModule, ToastModule, TableModule, IconFieldModule, InputIconModule, DropdownModule],
  templateUrl: './categoryform.component.html',
  styleUrl: './categoryform.component.scss',
  providers: [MessageService, TypeCategoryService, CategoryService]
})
export class CategoryformComponent implements OnInit {
  visible: boolean = false;
  isNotFirstSaved: boolean = false;
  formCategory!: FormGroup;
  typeCategoriesOptions: ParameterModel[] = [];
  categoryCreateRequest = new CategoryCreateRequest();
  @Output() complete = new EventEmitter<boolean>();
  

  constructor(private messageService: MessageService, private typeCategoryService: TypeCategoryService, private categoryService: CategoryService){}

  ngOnInit(): void {
    this.formCategory = new FormGroup({
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
  }

  saveCategory(){
    if (this.formCategory.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verify all data' });
      return;
    }
    this.isNotFirstSaved = true;

    this.categoryCreateRequest.title = this.formCategory.controls["title"].value;
    this.categoryCreateRequest.typeId = this.formCategory.controls["typeId"].value;

    this.categoryService.createCategory(this.categoryCreateRequest).subscribe({
      next: (message) => {
        this.messageService.add({ severity: 'success', summary: 'Category', detail: message.message });

        this.complete.emit(true);
        setTimeout(() => {
          this.visible = false;
        }, 500);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error ocurred' });
        this.isNotFirstSaved = false;
      }
    })
  }
}
