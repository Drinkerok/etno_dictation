import './components/polyfills';
import App from './components/application';

App.showWelcome();

const script = document.querySelector(`script`);
if (script) {
  script.parentNode.removeChild(script);
}
