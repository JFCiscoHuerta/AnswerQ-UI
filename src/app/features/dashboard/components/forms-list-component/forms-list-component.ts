import { MatIconModule } from '@angular/material/icon';
import { PageResponse } from '../../../../shared/models/page-response';
import { DashboardService } from '../../services/dashboard-service';
import { Form } from './../../models/form';

import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forms-list-component',
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './forms-list-component.html',
  styleUrl: './forms-list-component.css'
})
export class FormsListComponent {

  displayedColumns = ['name', 'isEnabled', 'actions'];
  dashboardService = inject(DashboardService);

  form: Form[] = [];
  totalElements = 0;
  page = 0;
  size = 10;
  loading = false;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(page: number = 0) {
    this.loading = true;

    this.dashboardService.getForms(page, this.size)
    .subscribe({
      next: (res: PageResponse<Form>) => {
        this.form = res.content;
        this.totalElements = res.totalElements;
        this.page = res.number;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

  }

  onPageChange(event: any) {
    this.loadForms(event.pageIndex);
  }

  createForm() {};

  editForm(form: Form) {}

  deleteForm(form: Form) {}

}
