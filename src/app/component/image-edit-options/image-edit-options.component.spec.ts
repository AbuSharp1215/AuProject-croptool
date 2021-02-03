import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditOptionsComponent } from './image-edit-options.component';

describe('ImageEditOptionsComponent', () => {
  let component: ImageEditOptionsComponent;
  let fixture: ComponentFixture<ImageEditOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageEditOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
