import categories from '../../categories.json'
import CategoryList from '../../components/category-list';
import '../../App.scss';

function Home() {
  return (
    <div className="home">
      <CategoryList categories={categories} />
    </div>
  );
}

export default Home;
