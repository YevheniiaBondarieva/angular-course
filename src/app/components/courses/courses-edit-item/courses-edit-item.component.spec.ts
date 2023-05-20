import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesEditItemComponent } from './courses-edit-item.component';

describe('CoursesEditItemComponent', () => {
  let component: CoursesEditItemComponent;
  let fixture: ComponentFixture<CoursesEditItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoursesEditItemComponent]
    });
    fixture = TestBed.createComponent(CoursesEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
