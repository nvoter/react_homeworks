import { I18nextProvider } from 'react-i18next';
import './App.css';
import UnreadMessages from './components/UnreadMessages';
import i18n from './utils/i18n';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <UnreadMessages />
      </I18nextProvider>
    </>
  )
}

export default App
