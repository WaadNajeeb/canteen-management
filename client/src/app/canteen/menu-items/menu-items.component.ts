import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { MatCardModule } from '@angular/material/card';
import { CanteenService, FoodMenuItem } from '../../services/canteen.service';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, filter, map, merge, Observable, switchMap } from 'rxjs';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UiTextboxMaterialComponent } from '../../shared/ui-textbox-material/ui-textbox-material.component';
@Component({
  selector: 'app-menu-items',
  imports: [MenuItemComponent, MatCardModule, AsyncPipe, RouterOutlet, MatPaginatorModule, SlicePipe, MatFormField, MatFormFieldModule,ReactiveFormsModule, FormsModule, MatInputModule, UiTextboxMaterialComponent],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss'
})
export class MenuItemsComponent implements OnInit{
  ngOnInit(): void {
    this.searchForm.controls.searchTerm.valueChanges.pipe(
      filter((searchTerm: string | null) => searchTerm != null && searchTerm !== ''),

    ).subscribe((v: string | null) => {
      if(v){
this.onSearchChange(v);
      }

    } );
  }

private canteenService = inject(CanteenService);
private fb = inject(FormBuilder);
  // Define searchTerm and currentPage as BehaviorSubjects
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly currentPage$ = new BehaviorSubject<number>(1);


   searchForm = new FormGroup<SearchTermFG>({
    searchTerm: new FormControl<string>('')
   })
  // Combine observables and fetch menu items
  readonly menuItems$ = combineLatest([
    this.searchTerm$,
    this.currentPage$,
  ]).pipe(
    switchMap(([searchTerm, currentPage]) =>
      this.canteenService.getAllMenu2(searchTerm, currentPage)
    )
  );

  onPageChange(event: PageEvent) {
    this.currentPage$.next(event.pageIndex + 1);
  }

  onSearchChange(term: string) {
    this.searchTerm$.next(term);
    this.currentPage$.next(1);
  }

  get control(){
    return this.searchForm.controls.searchTerm;
  }
}


export interface SearchTermFG{
  searchTerm: FormControl<string | null>;
}
