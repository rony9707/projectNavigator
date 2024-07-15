import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLinksComponent } from './download-links.component';

describe('DownloadLinksComponent', () => {
  let component: DownloadLinksComponent;
  let fixture: ComponentFixture<DownloadLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
