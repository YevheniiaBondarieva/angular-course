import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesNewItemComponent } from './courses-new-item.component';

describe('CoursesNewItemComponent', () => {
  let component: CoursesNewItemComponent;
  let fixture: ComponentFixture<CoursesNewItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoursesNewItemComponent]
    });
    fixture = TestBed.createComponent(CoursesNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
