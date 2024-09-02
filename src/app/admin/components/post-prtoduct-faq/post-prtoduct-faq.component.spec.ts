import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPrtoductFaqComponent } from './post-prtoduct-faq.component';

describe('PostPrtoductFaqComponent', () => {
  let component: PostPrtoductFaqComponent;
  let fixture: ComponentFixture<PostPrtoductFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPrtoductFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPrtoductFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
