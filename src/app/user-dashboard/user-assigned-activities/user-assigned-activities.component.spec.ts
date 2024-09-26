import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignedActivitiesComponent } from './user-assigned-activities.component';

describe('UserAssignedActivitiesComponent', () => {
  let component: UserAssignedActivitiesComponent;
  let fixture: ComponentFixture<UserAssignedActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAssignedActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssignedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
