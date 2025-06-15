import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerNavBarComponent } from './consumer-nav-bar.component';

describe('ConsumerNavBarComponent', () => {
  let component: ConsumerNavBarComponent;
  let fixture: ComponentFixture<ConsumerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
