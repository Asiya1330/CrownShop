import React from 'react';
import './index.scss'

export default function CategoryItem({ id, title, imageUrl }) {
    return (

        <div key={id} className='category-container'>
            <img className='background-image' src={imageUrl} />
            <div className="category-body-container">
                <h2>
                    {title}
                </h2>
                <p>
                    Shop now
                </p>
            </div>
        </div>
    )
}
