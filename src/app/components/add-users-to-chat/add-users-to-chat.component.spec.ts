import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToChatComponent } from './add-users-to-chat.component';

describe('AddUsersToChatComponent', () => {
  let component: AddUsersToChatComponent;
  let fixture: ComponentFixture<AddUsersToChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsersToChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsersToChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
