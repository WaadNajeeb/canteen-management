import { AsyncPipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';
import { MenuItemComponent } from '../canteen/menu-item/menu-item.component';
import { UiTextboxMaterialComponent } from '../shared/ui-textbox-material/ui-textbox-material.component';
import { filter, BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { SearchTermFG } from '../canteen/menu-items/menu-items.component';
import { CanteenService } from '../services/canteen.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-user-favourite-order-view',
  imports: [MenuItemComponent, MatCardModule, AsyncPipe, RouterOutlet, MatPaginatorModule, SlicePipe, MatFormField, MatFormFieldModule,ReactiveFormsModule, FormsModule, MatInputModule, UiTextboxMaterialComponent],
  templateUrl: './user-favourite-order-view.component.html',
  styleUrl: './user-favourite-order-view.component.scss'
})
export class UserFavouriteOrderViewComponent implements OnInit {
  ngOnInit(): void {
    this.searchForm.controls.searchTerm.valueChanges
      .pipe(
        filter(
          (searchTerm: string | null) => searchTerm != null && searchTerm !== ''
        )
      )
      .subscribe((v: string | null) => {
        if (v) {
          this.onSearchChange(v);
        }
      });
  }

  private favourite = inject(FavouriteService);
  // Define searchTerm and currentPage as BehaviorSubjects
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly currentPage$ = new BehaviorSubject<number>(1);

  searchForm = new FormGroup<SearchTermFG>({
    searchTerm: new FormControl<string>(''),
  });
  // Combine observables and fetch menu items
  readonly menuItems$ = combineLatest([
    this.searchTerm$,
    this.currentPage$,
  ]).pipe(
    switchMap(([searchTerm, currentPage]) =>
      this.favourite.getFavourites(searchTerm, currentPage)
    )
  );

  onPageChange(event: PageEvent) {
    this.currentPage$.next(event.pageIndex + 1);
  }

  onSearchChange(term: string) {
    this.searchTerm$.next(term);
    this.currentPage$.next(1);
  }

  get control() {
    return this.searchForm.controls.searchTerm;
  }


}
