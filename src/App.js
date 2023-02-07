import './App.scss';
import categories from './categories.json'
import CategoryList from './components/category-list';

function App() {
  return (
    <div className="app">
      <CategoryList categories={categories} />
    </div>
  );
}

export default App;
