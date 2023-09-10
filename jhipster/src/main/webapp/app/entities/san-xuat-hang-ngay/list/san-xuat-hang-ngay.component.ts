import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISanXuatHangNgay } from '../san-xuat-hang-ngay.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { SanXuatHangNgayService } from '../service/san-xuat-hang-ngay.service';
import { SanXuatHangNgayDeleteDialogComponent } from '../delete/san-xuat-hang-ngay-delete-dialog.component';

@Component({
  selector: 'jhi-san-xuat-hang-ngay',
  templateUrl: './san-xuat-hang-ngay.component.html',
  styleUrls: ['./san-xuat-hang-ngay.component.css']
})
export class SanXuatHangNgayComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  sanXuatHangNgays?: ISanXuatHangNgay[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  thietBisSharedCollection: IThietBi[] = [];

  editForm = this.fb.group({
    id: [],
    maThietBi: [],
    loaiThietBi: [],
    hangTms: [],
    thongSo: [],
    moTa: [],
    trangThai: [],
    phanLoai: [],
    thietBi: [],
  });


  constructor(
    protected sanXuatHangNgayService: SanXuatHangNgayService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected fb: FormBuilder,
  ) { }
  
  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.sanXuatHangNgayService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<ISanXuatHangNgay[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  ngOnInit(): void {
    this.handleNavigation();
  }

  trackId(_index: number, item: ISanXuatHangNgay): number {
    return item.id!;
  }

  delete(sanXuatHangNgay: ISanXuatHangNgay): void {
    const modalRef = this.modalService.open(SanXuatHangNgayDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sanXuatHangNgay = sanXuatHangNgay;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: ISanXuatHangNgay[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/san-xuat-hang-ngay'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.sanXuatHangNgays = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
