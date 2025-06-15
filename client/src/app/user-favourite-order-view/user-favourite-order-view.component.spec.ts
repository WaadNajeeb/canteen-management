import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouriteOrderViewComponent } from './user-favourite-order-view.component';

describe('UserFavouriteOrderViewComponent', () => {
  let component: UserFavouriteOrderViewComponent;
  let fixture: ComponentFixture<UserFavouriteOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFavouriteOrderViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFavouriteOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
