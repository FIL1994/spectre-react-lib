// Used to load happy-dom in bun when running tests
import { afterEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

afterEach(() => {
  document.body.innerHTML = '';
});
