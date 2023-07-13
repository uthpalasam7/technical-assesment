import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css'],
})
export class UpdatePopupComponent {
  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editdata: any;

  title: string =
    this.data.customerCode != '' && this.data.customerCode != null
      ? 'Update Customer'
      : 'Add Customer';

  ngOnInit(): void {
    if (this.data.customerCode != '' && this.data.customerCode != null) {
      this.loadCustomerData(this.data.customerCode);
    }
  }

  customerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', [Validators.required, Validators.email]),
    // email: this.builder.control(
    //   '',
    //   Validators.compose([Validators.required, Validators.email])
    // ),
    address: this.builder.control('', Validators.required),
  });

  loadCustomerData(code: any) {
    this.service.getCustomerbyId(code).subscribe((res) => {
      this.editdata = res;
      this.customerform.setValue({
        id: this.editdata.id,
        name: this.editdata.name,
        email: this.editdata.email,
        address: this.editdata.address,
      });
    });
  }

  submitForm() {
    if (this.customerform.valid) {
      if (this.data.customerCode != '' && this.data.customerCode != null) {
        this.service
          .updateCustomer(this.customerform.value.id, this.customerform.value)
          .subscribe((res) => {
            this.toastr.success('Updated successfully.');
            this.dialogref.close();
          });
      } else {
        this.service.addCustomer(this.customerform.value).subscribe((res) => {
          this.toastr.success('Added successfully.');
          this.dialogref.close();
        });
      }
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
