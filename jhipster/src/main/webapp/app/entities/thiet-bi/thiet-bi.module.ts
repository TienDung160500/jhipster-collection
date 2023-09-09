import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ThietBiComponent } from './list/thiet-bi.component';
import { ThietBiDetailComponent } from './detail/thiet-bi-detail.component';
import { ThietBiUpdateComponent } from './update/thiet-bi-update.component';
import { ThietBiDeleteDialogComponent } from './delete/thiet-bi-delete-dialog.component';
import { ThietBiRoutingModule } from './route/thiet-bi-routing.module';

@NgModule({
  imports: [SharedModule, ThietBiRoutingModule],
  declarations: [ThietBiComponent, ThietBiDetailComponent, ThietBiUpdateComponent, ThietBiDeleteDialogComponent],
  entryComponents: [ThietBiDeleteDialogComponent],
})
export class ThietBiModule {}
