import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IThietBi } from '../thiet-bi.model';
import { ThietBiService } from '../service/thiet-bi.service';

@Component({
  templateUrl: './thiet-bi-delete-dialog.component.html',
})
export class ThietBiDeleteDialogComponent {
  thietBi?: IThietBi;

  constructor(protected thietBiService: ThietBiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.thietBiService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
