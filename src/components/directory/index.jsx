
import DirectoryItem from '../directory-item';
import './index.scss'

function Directory({ categories }) {
    return (
        <div className="categories-container">
            {
                categories.map((category) => (
                    <DirectoryItem key={category.id} category={category} />
                ))
            }
        </div>
    );
}

export default Directory;

