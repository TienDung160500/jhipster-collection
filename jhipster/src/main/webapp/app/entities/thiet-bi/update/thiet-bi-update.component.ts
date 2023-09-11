import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  i = 0;
  editId: number | null = null;

  @Input() id = '';
  @Input() status = '';
  @Input() maThongSo = '';
  @Input() moTa = '';
  @Input() tenThongSo = '';

  thietBisSharedCollection: IThietBi[] = [];

  form: FormGroup;
  listOfThietBi = [
    {
      id: '',
      idThongSo: '',
      maThongSo: '',
      tenThongSo: '',
      moTa: '',
      status: '',
    },
  ];
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

  constructor(protected thietBiService: ThietBiService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {
    this.form = this.fb.group({
      maThietBi: ['', Validators.required],
      loaiThietBi: ['', Validators.required],
      updateBy: ['', Validators.required],
      trangThai: ['', Validators.required],
    });
  }

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

  // addRow(): void {
  //   if (this.form.valid) {
  //     this.form.reset();
  //   }
  // }

  save(): void {
    this.isSaving = true;
    const thietBi = this.createFromForm();
    if (thietBi.id !== undefined) {
      this.subscribeToSaveResponse(this.thietBiService.update(thietBi));
    } else {
      this.subscribeToSaveResponse(this.thietBiService.create(thietBi));
    }
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IThietBi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  onSaveSuccess(): void {
    this.previousState();
  }

  onSaveError(): void {
    // Api for inheritance.
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }

  updateForm(thietBi: IThietBi): void {
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

  createFromForm(): IThietBi {
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

  startEdit2(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  // count() {

  // }

  // khai bao lai them bien va them vao body
  // click vao o du lieu se reload (co du lieu)
  addRow(): void {
    this.listOfThietBi = [
      ...this.listOfThietBi,
      {
        id: '',
        idThongSo:'',
        maThongSo: '',
        tenThongSo: '',
        moTa: '',
        status: '',
      },
    ];
    console.log('add row', this.listOfThietBi);

    this.i++;
  }

  // sua lai xoa theo stt va ma thong so (id )
  deleteRow(id: string): void {
    this.listOfThietBi = this.listOfThietBi.filter(d => d.id !== this.id && d.idThongSo !== this.idThongSo);
  }
}
