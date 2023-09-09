import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IThietBi, ThietBi } from '../thiet-bi.model';
import { ThietBiService } from '../service/thiet-bi.service';

@Component({
  selector: 'jhi-thiet-bi-update',
  templateUrl: './thiet-bi-update.component.html',
})
export class ThietBiUpdateComponent implements OnInit {
  isSaving = false;
  predicate!: string;
  ascending!: boolean;

  thietBisSharedCollection: IThietBi[] = [];

  editForm = this.fb.group({
    id: [],
    maThietBi: [],
    loaiThietBi: [],
    dayChuyen: [],
    ngayTao: [],
    timeUpdate: [],
    updateBy: [],
    status: [],
  });

  constructor(protected thietBiService: ThietBiService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thietBi }) => {
      if (thietBi.id === undefined) {
        const today = dayjs().startOf('day');
        thietBi.ngayTao = today;
        thietBi.timeUpdate = today;
      }

      this.updateForm(thietBi);
    });
  }

  trackId(_index: number, item: IThietBi): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }

  save(): void {
    this.isSaving = true;
    const thietBi = this.createFromForm();
    if (thietBi.id !== undefined) {
      this.subscribeToSaveResponse(this.thietBiService.update(thietBi));
    } else {
      this.subscribeToSaveResponse(this.thietBiService.create(thietBi));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThietBi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(thietBi: IThietBi): void {
    this.editForm.patchValue({
      id: thietBi.id,
      maThietBi: thietBi.maThietBi,
      loaiThietBi: thietBi.loaiThietBi,
      dayChuyen: thietBi.dayChuyen,
      ngayTao: thietBi.ngayTao ? thietBi.ngayTao.format(DATE_TIME_FORMAT) : null,
      timeUpdate: thietBi.timeUpdate ? thietBi.timeUpdate.format(DATE_TIME_FORMAT) : null,
      updateBy: thietBi.updateBy,
      status: thietBi.status,
    });
  }

  protected createFromForm(): IThietBi {
    return {
      ...new ThietBi(),
      id: this.editForm.get(['id'])!.value,
      maThietBi: this.editForm.get(['maThietBi'])!.value,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      dayChuyen: this.editForm.get(['dayChuyen'])!.value,
      ngayTao: this.editForm.get(['ngayTao'])!.value ? dayjs(this.editForm.get(['ngayTao'])!.value, DATE_TIME_FORMAT) : undefined,
      timeUpdate: this.editForm.get(['timeUpdate'])!.value ? dayjs(this.editForm.get(['timeUpdate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateBy: this.editForm.get(['updateBy'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
