import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RecordCreateRequest } from '../../../../models/request/RecordCreateRequest';
import { RecordService } from '../../../../services/record.service';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CategoriesSelectComponent } from '../../../categories/form/categoriesseelect.component';

@Component({
  selector: 'app-recordform',
  standalone: true,
  imports: [FloatLabelModule, InputTextareaModule, ReactiveFormsModule, ButtonModule, TooltipModule, FormsModule, InputTextModule, DialogModule, 
    DropdownModule, ToastModule, TableModule, IconFieldModule, InputIconModule
  ],
  templateUrl: './recordform.component.html',
  styleUrl: './recordform.component.scss',
  providers: [MessageService]
})
export class RecordformComponent implements OnInit {
  visible: boolean = false;
  isNotFirstSaved: boolean = false;
  counterNote: number = 0;
  formRecord!: FormGroup;
  recordCreateRequest: RecordCreateRequest = new RecordCreateRequest();
  @Output() complete = new EventEmitter<boolean>();
  
  constructor(private recordService: RecordService, private messageService: MessageService){}

  ngOnInit(): void{
    this.formRecord = new FormGroup({
      amount: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]{1,8}(\.[0-9]{1,2})?$'), Validators.min(0.01), Validators.max(99999999.99)]),
      note: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      categoryTitle: new FormControl({value: undefined, disabled: true}, [Validators.required]),
      categoryId: new FormControl(undefined, [Validators.required])
    })
  };

  saveRecord(): void{
    if (this.formRecord.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verify all data' });
      return;
    }
    this.isNotFirstSaved = true;

    this.recordCreateRequest.amount = this.formRecord.controls["amount"].value;
    this.recordCreateRequest.categoryId = this.formRecord.controls["categoryId"].value;
    this.recordCreateRequest.note = this.formRecord.controls["note"].value.trim();

    this.recordService.createRecord(this.recordCreateRequest).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Record', detail: 'Record created successfully' });
        
          this.complete.emit(true);
          setTimeout(() => {
            this.visible = false;
          }, 500);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error ocurred' });
          this.isNotFirstSaved = false;
        }
      }
    )
  }

  updateCounterNote(event: Event){
    const note: String = this.formRecord.controls["note"].value;
    this.counterNote = note.length;
  }

  @ViewChild('dynamicSelectCategory', {read: ViewContainerRef})
  public dynamicSelectCategory!: ViewContainerRef;

  openDynamicSelectCategory(){
    const dynamicComp = this.dynamicSelectCategory.createComponent(CategoriesSelectComponent).instance;
    if (dynamicComp){
      dynamicComp.visible = true;
      dynamicComp.complete.subscribe(dataCategory => {
        this.formRecord.controls["categoryId"].setValue(dataCategory.categoryId);
        this.formRecord.controls["categoryTitle"].setValue(dataCategory.categoryTitle);
      })
    }
  }
}
