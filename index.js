import { setDefaultThemeStyle } from './init';
import getTheme from './theme';
import variables from './variables';
setDefaultThemeStyle();

// Theme
export { getTheme };
export { variables };
export { StyleProvider } from '@shoutem/theme';

export { Button } from './components/Button';
export { Icon } from './components/Icon';
export { Header } from './components/Header';
export { Title } from './components/Title';
export { Fab } from './components/Fab';

const mapPropsToStyleNames = (styleNames, props) => {
  console.log('title');
  return _.keys(props);
}

export { mapPropsToStyleNames };

export {
  Text,
} from './components/Text';
