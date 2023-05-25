import { RenderResult, render } from '@testing-library/angular';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let fixture: RenderResult<LogoComponent>;
  let component: LogoComponent;

  it('should create', async () => {
    fixture = await render(LogoComponent);
    component = fixture.fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
