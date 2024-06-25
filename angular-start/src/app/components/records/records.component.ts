import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { RecordDto } from '../../models/dto/RecordDto';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RecordEnum } from '../../common/enums/RecordEnum';
import { OrderListModule } from 'primeng/orderlist';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { RecordformComponent } from './form/recordform/recordform.component';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from '../../services/dialog.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RecordupdateComponent } from './form/recordupdate/recordupdate.component';
import { MenuComponent } from '../menu/menu.component';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../common/Constants';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [RecordformComponent, MenuComponent, ButtonModule, DataViewModule, TagModule, OrderListModule, TableModule, RatingModule, CommonModule, ToolbarModule, 
    TooltipModule, ToastModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
  providers: [MessageService]
})
export class RecordsComponent implements OnInit {
  recordsList: RecordDto[] = [];
  totalRecords: number = 0;
  pageNo: number = 0;
  pageSize: number = 5;
  loading: boolean = true;

  constructor(private recordService: RecordService, private dialogService: DialogService, private messageService: MessageService, 
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(Constants.TITLE.concat("Records"));
  }

  loadRecords($event: TableLazyLoadEvent){
    this.loading = true;
    this.pageNo = ($event.first || 0) / this.pageSize;
    this.recordService.listRecords(this.pageNo, this.pageSize).subscribe({
      next: records => {
        this.loading = false;
        this.recordsList = records.data.records;
        this.totalRecords = records.data.totalRecords;
      }
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

  @ViewChild('dynamicFormRecord', {read: ViewContainerRef})
  public dynamicFormRecord!: ViewContainerRef;
  openDynamicFormRecord(): void{
    const dynamicComp = this.dynamicFormRecord.createComponent(RecordformComponent).instance;
    if (dynamicComp){
      dynamicComp.visible = true;
      dynamicComp.complete.subscribe(complete => {
        if (complete){
          this.loadRecords({first: this.pageNo * this.pageSize});
        }
      })
    }
  }

  openDynamicFormUpdateRecord(recordId: number): void{
    const dynamicComp = this.dynamicFormRecord.createComponent(RecordupdateComponent).instance;
    const recordToUpdate = this.recordsList.find(record => record.id === recordId);
    if (!recordToUpdate){
      this.messageService.add({ severity: 'error', summary: 'Record', detail: 'Record Not Found' });
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
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Record', detail: error.error.message });
        }
      });
    }).catch(() => {})
  }
}
