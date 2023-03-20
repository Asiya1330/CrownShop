import categories from '../../categories.json'
import Directory from '../../components/directory';

function Home() {
  return (
    <div className="home">
      <Directory categories={categories} />
    </div>
  );
}

export default Home;
