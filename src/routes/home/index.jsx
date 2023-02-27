import categories from '../../categories.json'
import Directory from '../../components/directory';
import '../../App.scss';

function Home() {
  return (
    <div className="home">
      <Directory categories={categories} />
    </div>
  );
}

export default Home;
