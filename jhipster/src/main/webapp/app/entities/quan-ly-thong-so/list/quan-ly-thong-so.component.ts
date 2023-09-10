import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuanLyThongSo } from '../quan-ly-thong-so.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';
import { QuanLyThongSoDeleteDialogComponent } from '../delete/quan-ly-thong-so-delete-dialog.component';

@Component({
  selector: 'jhi-quan-ly-thong-so',
  templateUrl: './quan-ly-thong-so.component.html',
  styleUrls: ['./quan-ly-thong-so.component.css'],
})
export class QuanLyThongSoComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/quan-ly-thong-so/tim-kiem');

  @Input() maThongSo = '';
  @Input() tenThongSo = '';
  @Input() moTa = '';
  @Input() ngayTao = null;
  @Input() ngayUpdate = null;
  @Input() updateBy = '';
  @Input() status = '';

  quanLyThongSos?: IQuanLyThongSo[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  // lưu từ khóa tìm kiếm
  searchKeyword = '';
  // lưu kết quả tìm kiếm
  seachResult: any[] = [];
  // lưu các gợi ý tìm kiếm
  searchSuggestions: string[] = [];
  // hiển thị danh sácsh tìm kiếm
  showSuggestions = false;
  // theo dõi sự kiện keyup trên ô tìm kiếm
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  searchResults: IQuanLyThongSo[] = [];

  constructor(
    protected quanLyThongSoService: QuanLyThongSoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  timKiemThietBi(): void {
    //xoa du lieu cu
    this.searchResults = [];
    //request den server
    const timKiem = {
      maThongSo: this.maThongSo,
      tenThongSo: this.tenThongSo,
      moTa: this.moTa,
      ngayTao: this.ngayTao,
      ngayUpdate: this.ngayUpdate,
      updateBy: '',
      status: this.status,
    };
    if (sessionStorage.getItem('thiet bi' + JSON.stringify(timKiem)) === null) {
      this.http.post<any>(this.resourceUrl, timKiem).subscribe(res => {
        //luu du lieu tra ve de hien thi len front-end
        this.quanLyThongSos = res;
        sessionStorage.setItem('thiet bi' + JSON.stringify(timKiem), res);
      });
    } else {
      const result = sessionStorage.getItem('thiet bi' + JSON.stringify(timKiem));
      if (result) {
        this.searchResults = JSON.parse(result);
      }
    }
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.quanLyThongSoService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IQuanLyThongSo[]>) => {
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

  trackId(_index: number, item: IQuanLyThongSo): number {
    return item.id!;
  }

  delete(quanLyThongSo: IQuanLyThongSo): void {
    const modalRef = this.modalService.open(QuanLyThongSoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.quanLyThongSo = quanLyThongSo;
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

  protected onSuccess(data: IQuanLyThongSo[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/quan-ly-thong-so'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.quanLyThongSos = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}

