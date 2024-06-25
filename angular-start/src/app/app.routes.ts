import { Routes } from '@angular/router';
import { RecordsComponent } from './components/records/records.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'records', component: RecordsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'historial', component: HistorialComponent},
    {path: '', component: HomeComponent}
];
