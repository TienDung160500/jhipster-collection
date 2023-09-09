import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThietBi } from '../thiet-bi.model';

@Component({
  selector: 'jhi-thiet-bi-detail',
  templateUrl: './thiet-bi-detail.component.html',
})
export class ThietBiDetailComponent implements OnInit {
  predicate!: string;
  ascending!: boolean;
  thietBi: IThietBi | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thietBi }) => {
      this.thietBi = thietBi;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
