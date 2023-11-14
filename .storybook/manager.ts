import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const myTheme = create({
  base: 'light',
  brandTitle: 'spectre-react-lib',
  brandUrl: 'https://github.com/FIL1994/spectre-react-lib',
  // brandImage: 'https://picturepan2.github.io/spectre/img/spectre-logo.svg',
  brandTarget: '_blank',
});

addons.setConfig({
  theme: myTheme,
});
