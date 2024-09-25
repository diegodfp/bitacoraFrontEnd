import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityManagementComponent } from './admin-activity-management.component';

describe('AdminActivityManagementComponent', () => {
  let component: AdminActivityManagementComponent;
  let fixture: ComponentFixture<AdminActivityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActivityManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActivityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
