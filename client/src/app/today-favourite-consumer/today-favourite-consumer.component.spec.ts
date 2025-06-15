import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayFavouriteConsumerComponent } from './today-favourite-consumer.component';

describe('TodayFavouriteConsumerComponent', () => {
  let component: TodayFavouriteConsumerComponent;
  let fixture: ComponentFixture<TodayFavouriteConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayFavouriteConsumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayFavouriteConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
