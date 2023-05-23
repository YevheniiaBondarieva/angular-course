import { RenderResult, render } from '@testing-library/angular';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: RenderResult<LoginComponent>;
  let component: LoginComponent;

  it('should create', async () => {
    fixture = await render(LoginComponent);
    component = fixture.fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
