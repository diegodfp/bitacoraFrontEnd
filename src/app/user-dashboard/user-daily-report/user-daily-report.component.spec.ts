import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDailyReportComponent } from './user-daily-report.component';

describe('UserDailyReportComponent', () => {
  let component: UserDailyReportComponent;
  let fixture: ComponentFixture<UserDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDailyReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
