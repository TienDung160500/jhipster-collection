import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { KichBanComponent } from './list/kich-ban.component';
import { KichBanDetailComponent } from './detail/kich-ban-detail.component';
import { KichBanUpdateComponent } from './update/kich-ban-update.component';
import { KichBanDeleteDialogComponent } from './delete/kich-ban-delete-dialog.component';
import { KichBanRoutingModule } from './route/kich-ban-routing.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [SharedModule, KichBanRoutingModule],
  declarations: [KichBanComponent, KichBanDetailComponent, KichBanUpdateComponent, KichBanDeleteDialogComponent, EditComponent],
  entryComponents: [KichBanDeleteDialogComponent],
})
export class KichBanModule {}
