import { useState } from 'react';
import { NavigationBar } from './components/NavigationBar'
import { ProductList } from './components/ProductList'

function App() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
      setMenuVisible(!isMenuVisible);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NavigationBar onMenuToggle={toggleMenu} isMenuVisible={isMenuVisible}/>
      <ProductList isMenuVisible={ isMenuVisible } toggleMenu={toggleMenu}/>
    </div>
  )
}

export default App