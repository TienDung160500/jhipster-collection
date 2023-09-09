import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IThietBi } from '../thiet-bi.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ThietBiService } from '../service/thiet-bi.service';
import { ThietBiDeleteDialogComponent } from '../delete/thiet-bi-delete-dialog.component';

@Component({
  selector: 'jhi-thiet-bi',
  templateUrl: './thiet-bi.component.html',
  styleUrls: ['./thiet-bi.component.css']
})
export class ThietBiComponent implements OnInit {
  @Input() maThietBi = '';
  @Input() loaiThietBi = '';
  @Input() dayChuyen = '';
  @Input() status = '';
  @Input() ngayTao = null;
  @Input() timeUpdate = null;
  @Input() thongSo = '';
  @Input() moTa = '';
  @Input() phanLoai = '';

  thietBis?: IThietBi[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  searchResults: IThietBi[] = [];

  // lưu từ khóa tìm kiếm
  searchKeyword = ''
  // lưu kết quả tìm kiếm
  seachResult: any[] = [];
  // lưu các gợi ý tìm kiếm
  searchSuggestions: string[] = [];
  // hiển thị danh sácsh tìm kiếm
  showSuggestions = false;
  // theo dõi sự kiện keyup trên ô tìm kiếm
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  

  constructor(
    protected thietBiService: ThietBiService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    // nhận tham chiếu đến HttpClient để thực hiện các yêu cầu Http
    private http: HttpClient
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.thietBiService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IThietBi[]>) => {
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
    // sử dụng fromEvent để tạo 1 Observable từ keyup
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // sử dụng toán tử để quản lý sự kiện nhập
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          if (this.searchKeyword.trim() === '') {
            return [];
          }
          //  kiểm tra từ khóa tìm kiếm không trống thì gọi hàm fetchSearcgSuggestions để lấy gợi ý
          return this.fetchSearchSuggestions(this.searchKeyword);
        })
    ) 
      // kết quả gợi ý được lưu trong searchSuggestions và giao diện người dùng được cập nhật để hiển thị danh sách gợi ý
      .subscribe(suggestions => {
        this.searchSuggestions = suggestions;
        this.showSuggestions = true;
    })
  }

  // được gọi mỗi khi có sự kiện nhập trong ô tìm kiếm, kiểm tra nếu từ khóa tìm kiếm trống thì showSuggestions là false
  onSearchInput() {
    if (this.searchKeyword.trim() === '') {
      this.showSuggestions = false
    }
  }

  // được gọi khi người dùng enter. đặt showSuggestions thành false và gọi phương thức search() để thực hiện tìm kiếm
  onSearchEnter() {
    this.showSuggestions = false;
    this.search();
  }

  // thực hiện tìm kiếm bằng cách gọi fetchSearchResults, sau đó cập nhật searchResult với kq tìm kiếm và lưu vào sessionStorage để tạo bộ nhớ cache
  search() {
    this.fetchSearchResults().subscribe(res => {
      console.log('tim kiem', res);
      this.searchResults = res as any;
      sessionStorage.setItem('thiet bi' + JSON.stringify(this.searchKeyword), JSON.stringify(res));
    });
  }

  private fetchSearchSuggestions(keyword: string): Observable<string[]> { 
    const suggestions = {}
    return of([]);
  }

  private fetchSearchResults(): Observable<any[]> {
    const timKiem = {
      maThietBi: this.maThietBi,
      loaiThietBi: this.loaiThietBi,
      dayChuyen: this.dayChuyen,
      ngayTao: this.ngayTao,
      timeUpdate: this.timeUpdate,
      updateBy: '',
      status: this.status,
    };

    const cachedResult = sessionStorage.getItem('thiet bi' + JSON.stringify(timKiem));
    if (cachedResult) {
      console.log('Lấy từ cache');
      return of(JSON.parse(cachedResult));
    }

    return this.http.post<any[]>('http://localhost:8080/thiet-bi/tim-kiem', timKiem)
      .pipe(
        switchMap(res => {
          sessionStorage.setItem('thiet bi' + JSON.stringify(timKiem), JSON.stringify(res));
          return of(res);
        })
      );
  }

  trackId(_index: number, item: IThietBi): number {
    return item.id!;
  }

  // timKiemThietBi() {
  //   //xoa du lieu cu
  //   this.searchResults = [];
  //   //request den server
  //   var timKiem = {
  //     maThietBi: this.maThietBi,
  //     loaiThietBi: this.loaiThietBi,
  //     dayChuyen: this.dayChuyen,
  //     ngayTao: this.ngayTao,
  //     timeUpdate: this.timeUpdate,
  //     updateBy: '',
  //     status: this.status,
  //   };
  //   if (sessionStorage.getItem('thiet bi' + JSON.stringify(timKiem)) === null) {
  //     this.http.post<any>('http://192.168.18.145:5000/thiet-bi/tim-kiem', timKiem).subscribe(res => {
  //       console.log('tim kiem', res);
  //       //luu du lieu tra ve de hien thi len front-end
  //       this.searchResults = res as any;
  //       sessionStorage.setItem('thiet bi' + JSON.stringify(timKiem), res);
  //     });
  //   } else {
  //     var result = sessionStorage.getItem('thiet bi' + JSON.stringify(timKiem));
  //     if (result) {
  //       console.log('lay du lieu tren cache');
  //       this.searchResults = JSON.parse(result);
  //     }
  //   }
  // }


  delete(thietBi: IThietBi): void {
    const modalRef = this.modalService.open(ThietBiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thietBi = thietBi;
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

  protected onSuccess(data: IThietBi[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/thiet-bi'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.thietBis = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
