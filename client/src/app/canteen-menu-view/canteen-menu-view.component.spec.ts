import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenMenuViewComponent } from './canteen-menu-view.component';

describe('CanteenMenuViewComponent', () => {
  let component: CanteenMenuViewComponent;
  let fixture: ComponentFixture<CanteenMenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanteenMenuViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanteenMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
