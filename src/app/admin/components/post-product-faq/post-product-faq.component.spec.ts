import { HttpTestingController } from '@angular/common/http/testing';
import { FormGroupDirective } from '@angular/forms';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPrtoductFaqComponent } from './post-product-faq.component';

describe('PostPrtoductFaqComponent', () => {
  let component: PostPrtoductFaqComponent;
  let fixture: ComponentFixture<PostPrtoductFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
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

  it('updates the FAQ being edited instead of posting a new one', () => {
    const http = TestBed.inject(HttpTestingController);
    const form = jasmine.createSpyObj<FormGroupDirective>('form', ['resetForm']);
    http.expectOne(req => req.method === 'GET').flush([{ id: 4, question: 'Q', answer: 'A' }]);

    component.edit(component.faqs[0]);
    component.saveFAQ(form);
    const save = http.expectOne(req => req.url.endsWith('api/admin/faq/4'));
    expect(save.request.method).toBe('PUT');
    save.flush({ id: 4 });

    expect(form.resetForm).toHaveBeenCalled();
    expect(component.editingId).toBeNull();
    http.expectOne(req => req.method === 'GET').flush([]);
  });

  it('does not submit an empty FAQ', () => {
    const http = TestBed.inject(HttpTestingController);
    http.expectOne(req => req.method === 'GET').flush([]);
    component.saveFAQ(jasmine.createSpyObj<FormGroupDirective>('form', ['resetForm']));
    http.verify();
  });
});
