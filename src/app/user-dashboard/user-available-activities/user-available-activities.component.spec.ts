import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvailableActivitiesComponent } from './user-available-activities.component';

describe('UserAvailableActivitiesComponent', () => {
  let component: UserAvailableActivitiesComponent;
  let fixture: ComponentFixture<UserAvailableActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvailableActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvailableActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
