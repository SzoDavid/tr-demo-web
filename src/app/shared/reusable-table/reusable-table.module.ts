import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReusableTableComponent} from "./reusable-table.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";



@NgModule({
  declarations: [
    ReusableTableComponent
  ],
  exports: [
    ReusableTableComponent
  ],
  imports: [
    CommonModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatSortHeader
  ]
})
export class ReusableTableModule { }
