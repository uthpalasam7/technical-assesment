import { Component, ViewChild } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  constructor(
    private service: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.loadCustomer();
  }

  customerList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadCustomer() {
    this.service.getAllCustomer().subscribe((res) => {
      this.customerList = res;
      this.dataSource = new MatTableDataSource(this.customerList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['name', 'email', 'address', 'action'];

  updateCustomer(id: any) {
    this.OpenDialog('300ms', '300ms', id);
  }
  addCustomer() {
    this.OpenDialog('300ms', '300ms', null);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: any) {
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      maxWidth: '400px',
      data: {
        customerCode: code,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.loadCustomer();
    });
  }

  removecustomer(code: any) {
    this.service.deleteCustomer(code).subscribe((res) => {
      this.toastr.success('Deleted successfully.');
      this.loadCustomer();
    });
  }
}
