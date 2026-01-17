import { Component, signal } from '@angular/core';
import { Nav } from './common/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  template: `<app-nav/>`,
  styles: ``
})
export class App {
  protected readonly title = signal('shopping-cart-signal');
}
