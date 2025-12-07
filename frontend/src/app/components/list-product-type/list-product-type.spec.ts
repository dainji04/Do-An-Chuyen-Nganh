import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductType } from './list-product-type';

describe('ListProductType', () => {
  let component: ListProductType;
  let fixture: ComponentFixture<ListProductType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
