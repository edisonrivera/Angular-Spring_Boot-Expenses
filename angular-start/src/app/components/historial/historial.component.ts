import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesSelectComponent } from '../categories/form/categoriesseelect.component';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { RecordService } from '../../services/record.service';
import { FilterParamsRecordRequest } from '../../models/request/FilterParamsRecordRequest';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { RecordDto } from '../../models/dto/RecordDto';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { RecordEnum } from '../../common/enums/RecordEnum';
import { RecordupdateComponent } from '../records/form/recordupdate/recordupdate.component';
import { DialogService } from '../../services/dialog.service';
import { ToastModule } from 'primeng/toast';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../common/Constants';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, CalendarModule, ButtonModule, TooltipModule, TableModule, CommonModule, TagModule, ToastModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss',
  providers: [MessageService, RecordService]
})
export class HistorialComponent implements OnInit {
  formHistorial!: FormGroup;
  isNotFirstSearching: boolean = false;
  recordsList: RecordDto[] = [];
  totalRecords: number = 0;
  pageNo: number = 0;
  pageSize: number = 5;
  loading: boolean = true;

  constructor(private formBuilder: FormBuilder, private recordService: RecordService, private messageService: MessageService, 
    private dialogService: DialogService, private titleService: Title
  ){}

  ngOnInit(): void {
    this.titleService.setTitle(Constants.TITLE.concat("Historial"));

    this.formHistorial = this.formBuilder.group({
      keyword: [null, Validators.maxLength(20)],
      rangeDates: [null],
      categoryTitle: new FormControl({value: null, disabled: true}, []),
      categoryId: [null]
    })
  }

  searchFilterRecords(){   
    if (this.isAllFiltersNull()) {
        this.messageService.add({ severity: 'error', summary: 'Filters', detail: 'Select at least one filter' });
        return;
    }

    this.loadRecords({first: this.pageNo * this.pageSize});
  }

  isAllFiltersNull(): boolean {
    return this.formHistorial.controls["keyword"].value === null && this.formHistorial.controls["categoryId"].value  === null 
    && this.formHistorial.controls["rangeDates"].value  === null && this.formHistorial.controls["categoryTitle"].value  === null;
  }

  cleanFiltersRecords(){
    if (this.isAllFiltersNull()){
      this.messageService.add({ severity: 'error', summary: 'Filters', detail: 'No filter is set yet' });
      return;
    }

    this.formHistorial.controls["keyword"].setValue(null);
    this.formHistorial.controls["categoryId"].setValue(null);
    this.formHistorial.controls["rangeDates"].setValue(null);
    this.formHistorial.controls["categoryTitle"].setValue(null);
  }

  loadRecords($event: TableLazyLoadEvent){
    const filterParams = new FilterParamsRecordRequest();
    filterParams.keyword = this.formHistorial.controls["keyword"].value;
    filterParams.categoryId = this.formHistorial.controls["categoryId"].value

    const dateRange: Date[] = this.formHistorial.controls["rangeDates"].value;
    if (dateRange){
      const datesFormatRange: string[] = dateRange.filter(date => date != null).map(date => this.formatDate(date));
      if (datesFormatRange.length === 1){
        filterParams.onlyDate = datesFormatRange[0];
      } else {
        filterParams.startDate = datesFormatRange[0];
        filterParams.endDate = datesFormatRange[1];
      }
    }
    this.loading = true;
    this.pageNo = ($event.first || 0) / this.pageSize;
    this.recordService.filterRecords(this.pageNo, this.pageSize, filterParams).subscribe({
      next: records => {
        this.loading = false;
        this.recordsList = records.data.records;       
        this.totalRecords = records.data.totalRecords;
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Historial', detail: error.error.message });

      }
    });
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

  @ViewChild('dynamicFormRecord', {read: ViewContainerRef})
  public dynamicFormRecord!: ViewContainerRef;
  openDynamicFormUpdateRecord(recordId: number): void{
    const dynamicComp = this.dynamicFormRecord.createComponent(RecordupdateComponent).instance;
    const recordToUpdate = this.recordsList.find(record => record.id === recordId);
    if (!recordToUpdate){
      this.messageService.add({ severity: 'error', summary: 'Record', detail: 'Record Not Found' })
      return;
    }

    if (dynamicComp){
      dynamicComp.visible = true;
      dynamicComp.recordId = recordId;
      dynamicComp.previousAmount = Math.abs(recordToUpdate.amount);
      dynamicComp.previousNote = recordToUpdate.note;
      dynamicComp.previousCategoryTitle = recordToUpdate.category;
      dynamicComp.previousCategoryId = recordToUpdate.categoryId;
      dynamicComp.complete.subscribe(() => {
        this.loadRecords({first: this.pageNo * this.pageSize})
      });
    }
  }

  deleteRecord(recordId: number){
    this.dialogService.showWarning("Are you sure to delete?", "Delete Record", true)
    .then(() => {
      this.recordService.deleteRecord(recordId).subscribe({
        next: message => {
          this.loadRecords({first: this.pageNo * this.pageSize});
          this.messageService.add({ severity: 'success', summary: 'Record', detail: message.message })
        }
      });
    }).catch(() => {})
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  @ViewChild('dynamicSelectCategory', {read: ViewContainerRef})
  public dynamicSelectCategory!: ViewContainerRef;
  openDynamicSelectCategory(){
    const dynamicComp = this.dynamicSelectCategory.createComponent(CategoriesSelectComponent).instance;
    if (dynamicComp){
      dynamicComp.visible = true;
      dynamicComp.complete.subscribe(dataCategory => {
        this.formHistorial.controls["categoryId"].setValue(dataCategory.categoryId);
        this.formHistorial.controls["categoryTitle"].setValue(dataCategory.categoryTitle);
      })
    }
  }
}
