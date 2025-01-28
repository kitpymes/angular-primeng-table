import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadEvent, FilterMetadata } from 'primeng/api';
import { TableModule, TableLazyLoadEvent  } from 'primeng/table';

import { Customer } from './app.model';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-primeng-table';
  datasource: Customer[] = [];
  customers: Customer[] = [];
  totalRecords: number = 0;
  cols: any[] = [];
  loading: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getData().subscribe(res => {
      this.datasource = res.data;
      this.totalRecords = res.data.length;
    });

    this.loading = true;
  }

  loadData(event: TableLazyLoadEvent) {
    console.log({event});

    const lazyLoadEvent: LazyLoadEvent = {
      first: event.first ?? 0,
      rows: event.rows ?? 0, // convert null or undefined to 0
      sortField: event.sortField === null ? undefined : event.sortField?.toString(),
      sortOrder: event.sortOrder === null ? undefined : event.sortOrder,
      filters: event.filters as { [s: string]: FilterMetadata; },
      multiSortMeta: event.multiSortMeta ?? undefined,
  };

  console.log({lazyLoadEvent});

    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      if (this.datasource) {
        this.customers = this.datasource.slice(lazyLoadEvent.first, (lazyLoadEvent.first as number + (lazyLoadEvent.rows as number) || 0 ));
        this.loading = false;
        (lazyLoadEvent as any).forceUpdate();
      }
    }, 1000);
  }
}
