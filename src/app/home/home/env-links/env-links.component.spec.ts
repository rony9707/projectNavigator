import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvLinksComponent } from './env-links.component';

describe('EnvLinksComponent', () => {
  let component: EnvLinksComponent;
  let fixture: ComponentFixture<EnvLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
