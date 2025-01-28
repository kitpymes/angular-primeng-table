import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule, TableLazyLoadEvent, Table } from 'primeng/table';

import { Customer, RequestFilterData, SortOrder } from './app.model';
import { AppService } from './app.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, TableModule, MultiSelectModule, ButtonModule, InputIconModule, IconFieldModule, InputTextModule, PaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-primeng-table';
  customers: Customer[] = [];
  totalRecords: number = 0;
  cols: any[] = [];
  loading: boolean = false;
  selectAll: boolean = false;
  selectedCustomers!: Customer[];

  representatives!: [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
];

  constructor(private readonly appService: AppService) { }

  ngOnInit() {
  }

  loadData(event: TableLazyLoadEvent) {
    this.loading = true;

    const requestFilterData: RequestFilterData = {
      first: event.first ?? 1,
      rows: event.rows ?? 10,
      sortField: event.sortField,
      sortOrder: event.sortOrder && event.sortOrder === 1 ? SortOrder.ASC : SortOrder.DESC,
      globalFilter: event.globalFilter,
      multiSort: event.multiSortMeta,
      last: event.last,
    };

    console.log(requestFilterData);

    setTimeout(() => {
      this.appService.getData(requestFilterData).subscribe(rows => {
        this.customers = rows;
        this.totalRecords = rows.length;
        this.loading = false;
        //(event as any).forceUpdate();
      });
    }, 1000);
  }

clear(table: Table) {
    table.clear();
}
}
