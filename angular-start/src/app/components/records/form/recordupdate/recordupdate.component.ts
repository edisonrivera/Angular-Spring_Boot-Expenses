import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CategoryDto } from '../../../../models/dto/CategoryDto';
import { CategoriesListResponseDto } from '../../../../models/response/CategoriesListResponseDto';
import { ParameterModel } from '../../../../models/ParameterModel';
import { lastValueFrom } from 'rxjs';
import { CategoryService } from '../../../../services/category.service';
import { CategoriesSelectComponent } from '../../../categories/form/categoriesseelect.component';
import { RecordService } from '../../../../services/record.service';
import { RecordUpdateRequest } from '../../../../models/request/RecordUpdateRequest';

@Component({
  selector: 'app-recordupdate',
  standalone: true,
  imports: [FloatLabelModule, InputTextareaModule, ReactiveFormsModule, ButtonModule, TooltipModule, FormsModule, InputTextModule, DialogModule, 
    DropdownModule, ToastModule],
  templateUrl: './recordupdate.component.html',
  styleUrl: './recordupdate.component.scss',
  providers: [MessageService, RecordService]

})
export class RecordupdateComponent implements OnInit {
  counterNote: number = 0;
  formUpdate!: FormGroup;
  visible: boolean = false;
  isNotFirstSaved: boolean = false;
  categoryOptions: ParameterModel[] = [];
  @Output() complete = new EventEmitter<boolean>();

  @Input() recordId: number = 0;
  @Input() previousAmount: number = 0.0;
  @Input() previousNote: string = '';
  @Input() previousCategoryTitle: string = '';
  @Input() previousCategoryId: number = 0;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private categoryService: CategoryService,
    private recordService: RecordService
  ){}

  ngOnInit(): void {
    this.formUpdate = this.formBuilder.group({
      amount: [0.0, [Validators.required, Validators.pattern('^[0-9]{1,8}(\.[0-9]{1,2})?$'), Validators.min(0.01), Validators.max(99999999.99)]],
      note: ['', [Validators.required, Validators.maxLength(100)]],
      categoryTitle: new FormControl({value: undefined, disabled: true}, [Validators.required]),
      categoryId: new FormControl(undefined, [Validators.required])
    })
    this.loadData();

    this.formUpdate.controls["amount"].setValue(this.previousAmount);
    this.formUpdate.controls["note"].setValue(this.previousNote);
    this.formUpdate.controls["categoryTitle"].setValue(this.previousCategoryTitle);
    this.formUpdate.controls["categoryId"].setValue(this.previousCategoryId);

  }
  
  validateNotEmptyData(res: CategoriesListResponseDto) {
    if (res.data.categories.length != 0) {
      return res.data.categories;
    }
    this.messageService.add({ severity: 'contrast', summary: 'Category', detail: 'Categories doesn\'t exists. Please, add at least one' });
    return [];
  }
  
  async loadData(){
    const categories: CategoryDto[] = this.validateNotEmptyData(await lastValueFrom(this.categoryService.listCategories(0, 10)));
    this.categoryOptions = categories.map(category => ({id: category.id, value: category.title}))
  }
  
  updateCounterNote(event: Event){
    const note: String = this.formUpdate.controls["note"].value;
    this.counterNote = note.length;
  }

  @ViewChild('dynamicSelectCategory', {read: ViewContainerRef})
  public dynamicSelectCategory!: ViewContainerRef;

  openDynamicSelectCategory(){
    const dynamicComp = this.dynamicSelectCategory.createComponent(CategoriesSelectComponent).instance;
    if (dynamicComp){
      dynamicComp.visible = true;
      dynamicComp.complete.subscribe(dataCategory => {
        this.formUpdate.controls["categoryId"].setValue(dataCategory.categoryId);
        this.formUpdate.controls["categoryTitle"].setValue(dataCategory.categoryTitle);
      })
    }
  }

  updateRecord(){
    if (this.formUpdate.invalid){
      this.messageService.add({ severity: 'error', summary: 'Record', detail: 'Verify All Data' });
      return;
    }
    
    this.isNotFirstSaved = true;
    const recordUpdateRequest = new RecordUpdateRequest();
    recordUpdateRequest.id = this.recordId;
    recordUpdateRequest.amount = this.formUpdate.controls["amount"].value;
    recordUpdateRequest.note = this.formUpdate.controls["note"].value;
    recordUpdateRequest.categoryId = this.formUpdate.controls["categoryId"].value;

    this.recordService.updateRecord(recordUpdateRequest).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Record', detail: 'Updated successfully' });

        this.complete.emit(true);
        setTimeout(() => {
          this.visible = false;
        }, 500);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Record', detail: 'An error has ocurred' });
        this.isNotFirstSaved = false;
      }
    })
  }
}
