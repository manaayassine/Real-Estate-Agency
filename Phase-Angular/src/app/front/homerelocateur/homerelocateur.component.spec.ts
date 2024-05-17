import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerelocateurComponent } from './homerelocateur.component';

describe('HomerelocateurComponent', () => {
  let component: HomerelocateurComponent;
  let fixture: ComponentFixture<HomerelocateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomerelocateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomerelocateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
