import { NavigationBar } from './components/NavigationBar'
import { ProductList } from './components/ProductList'

function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NavigationBar/>
      <div style={{ padding: '20px'}}>
          <h1 style={{paddingTop: '60px'}}>Товары</h1>
          <ProductList />
      </div>
    </div>
  )
}

export default App
