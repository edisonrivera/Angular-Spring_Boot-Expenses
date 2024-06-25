import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart'
import { StadisticsService } from '../../services/stadistics.service';
import { TagModule } from 'primeng/tag';
import { Constants } from '../../common/Constants';
import { StadisticsBalance } from '../../common/StadisticsBalance';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ChartModule, TagModule, ReactiveFormsModule, CalendarModule, ButtonModule, CommonModule, TooltipModule, ToastModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [StadisticsService, DatePipe, MessageService]
})
export class HomeComponent {
    // Balances
    balance: string = '';
    amount: string = '';
    expense: string = '';

    // Amount
    dataAmount: { [key: string]: any } = {};
    valuesAmounts: number[] = [];
    labelsAmount: string[] = [];
    optionsAmount: { [key: string]: any } =  StadisticsBalance.optionsAmount;

    // Expenses
    dataExpenses: { [key: string]: any } = {};
    valuesExpenses: number[] = [];
    labelsExpenses: string[] = [];
    optionsExpenses: { [key: string]: any } =  StadisticsBalance.optionsExpenses;

    //Amount Week
    dataWeek: { [key: string]: any } = {};
    valuesWeekAmounts: number[] = [];
    optionsWeek: { [key: string]: any } =  StadisticsBalance.optionsWeek;

    // Expenses Week
    valuesWeekExpenses: number[] = [];

    isFirstLoad: boolean = true;

    formDate!: FormGroup;

    constructor(private stadisticsService: StadisticsService, private formBuilder: FormBuilder, private datePipe: DatePipe, 
        private titleService: Title, private messageService: MessageService
    ) { }

    ngOnInit() {
        this.titleService.setTitle(Constants.TITLE.concat("Home"));

        this.formDate = this.formBuilder.group({
            date: [this.getCurrentDate(), [Validators.required]],
        })

        this.stadisticsService.getBalances().subscribe({
            next: balances => {
                this.balance = Constants.CURRENCY.concat(balances.data.totalBalance.toString());
                this.amount = Constants.CURRENCY.concat(balances.data.totalAmount.toString());
                this.expense = Constants.CURRENCY.concat(balances.data.totalExpense.toString());
            }
        })
        
        this.stadisticsService.getAmounts().subscribe({
            next: amouts => {
                this.valuesAmounts = amouts.data.map(record => record.amount);
                this.labelsAmount = amouts.data.map(record => record.note);

                this.dataAmount = {
                    labels: this.labelsAmount,
                    datasets: [
                        {
                            data: this.valuesAmounts
                        }
                    ]
                }
            }
        })

        this.stadisticsService.getExpenses().subscribe({
            next: expenses => {
                this.valuesExpenses = expenses.data.map(record => record.amount);
                this.labelsExpenses = expenses.data.map(record => record.note);

                this.dataExpenses = {
                    labels: this.labelsExpenses,
                    datasets: [
                        {
                            data: this.valuesExpenses
                        }
                    ]
                }
            }
        })

        this.loadWeekRecords();
    }

    loadWeekRecords(){
        let dateFormat: string = '';

        if(this.isFirstLoad){
            dateFormat = this.getCurrentDateFirst();
            this.isFirstLoad = false;
        } else {
            const date: Date = this.formDate.controls["date"].value;
            if (date === null){
                this.messageService.add({ severity: 'error', summary: 'Stadistics', detail: 'A date is required' });
                return
            }
            dateFormat = this.formatDate(date);
        }

        this.valuesWeekAmounts = this.initializeArrayWithZeros();
        this.valuesWeekExpenses = this.initializeArrayWithZeros();

        this.stadisticsService.getWeekAmounts(dateFormat).subscribe({
            next: amounts => {
                amounts.data.forEach(amount => {
                    const dayIndex = StadisticsBalance.labelDays.indexOf(amount.registerDay);
                    if (dayIndex !== -1) {
                        this.valuesWeekAmounts[dayIndex] = amount.amount;
                    }
                })
            }
        });

        this.stadisticsService.getExpensesAmounts(dateFormat).subscribe({
            next: expenses => {
                expenses.data.forEach(expense => {
                    const dayIndex = StadisticsBalance.labelDays.indexOf(expense.registerDay);
                    if (dayIndex !== -1){
                        this.valuesWeekExpenses[dayIndex] = expense.amount;
                    }
                })

                this.dataWeek = {
                    labels: StadisticsBalance.labelDays,
                    datasets: [
                        {
                            label: 'Amounts',
                            data: this.valuesWeekAmounts,
                            fill: false,
                            borderColor: 'green',
                            tension: 0.4
                        },
                        {
                            label: 'Expenses',
                            data: this.valuesWeekExpenses,
                            fill: false,
                            borderColor: 'orange',
                            tension: 0.4
                        }
                    ]
                }
            }
        });
    }

    refreshWithCurrentDate(){
        this.formDate.controls["date"].setValue(this.getCurrentDate());
        this.loadWeekRecords();
    }

    initializeArrayWithZeros(): number[] {
        return Array.from({ length: 7 }, () => 0);
    }

    formatDate(date: Date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString();
        return `${year}-${month}-${day}`;
    }

    getCurrentDateFirst(): string {
        return this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    }

    getCurrentDate(): Date {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        
        return new Date(year, month, day);
    }
}
