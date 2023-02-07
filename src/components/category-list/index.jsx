
import CategoryItem from '../category-item';
import './index.scss'

function CategoryList({categories}) {
    return (
        <div className="categories-container">
            {
                categories.map(({ id, imageUrl, title }) => (
                    <CategoryItem id={id} imageUrl={imageUrl} title={title} />
                ))
            }
        </div>
    );
}

export default CategoryList;

