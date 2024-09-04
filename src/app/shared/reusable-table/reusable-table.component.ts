import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {Observable} from "rxjs";
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

export interface ColumnDefinition {
  def: string;
  header: string;
  sortable: boolean;
  cell: (element: any) => string | number | boolean
}

@Component({
    selector: 'app-reusable-table',
    templateUrl: './reusable-table.component.html',
    styleUrl: './reusable-table.component.scss',
    standalone: true,
    imports: [MatTable, MatSort, NgFor, MatColumnDef, NgIf, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, NgTemplateOutlet, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class ReusableTableComponent {
  @Input() columns: Array<ColumnDefinition> = [];
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() pageSizeOptions: number[] = [10, 20, 50];
  @Input() pageSize = 10;
  @Input() totalElements = 0;
  @Input() actionsTemplate!: TemplateRef<any>;
  @Input() fetchData?: (pageIndex: number, pageSize: number, sortBy: string, sortDirection: string) => Observable<{
    content: any[];
    totalElements: number;
  }>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns.map(column => column.def), 'actions'];
  }

  ngAfterViewInit() {
    this.loadPage();
  }

  onPageChange(): void {
    this.loadPage();
  }

  onSortChange(): void {
    this.loadPage();
  }

  public loadPage() {
    if (!this.fetchData) return;

    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortBy = this.sort ? this.sort.active : 'id';
    const sortDirection = this.sort ? this.sort.direction : 'asc';

    this.fetchData(pageIndex, pageSize, sortBy, sortDirection).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
    });
  }
}
