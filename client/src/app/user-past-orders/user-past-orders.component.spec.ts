import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPastOrdersComponent } from './user-past-orders.component';

describe('UserPastOrdersComponent', () => {
  let component: UserPastOrdersComponent;
  let fixture: ComponentFixture<UserPastOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPastOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPastOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
