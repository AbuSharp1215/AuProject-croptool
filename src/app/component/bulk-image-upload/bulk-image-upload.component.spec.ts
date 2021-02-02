import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImageUploadComponent } from './bulk-image-upload.component';

describe('BulkImageUploadComponent', () => {
  let component: BulkImageUploadComponent;
  let fixture: ComponentFixture<BulkImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkImageUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
