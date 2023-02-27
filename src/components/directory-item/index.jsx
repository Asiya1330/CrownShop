import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DirectoryItemContainer, BackgroundImage, Body } from './index.style.jsx'

export default function DirectoryItem({ category }) {
    const { imageUrl, route, title } = category;

    const navigate = useNavigate();
    const categoryNavHandler = () => navigate(`${route}`)
    
    return (
        <DirectoryItemContainer onClick={categoryNavHandler}>
            <BackgroundImage imageUrl={imageUrl} >
            </BackgroundImage>
            <Body>
                <h2>
                    {title}
                </h2>
                <p>
                    Shop now
                </p>
            </Body>
        </DirectoryItemContainer>
    )
}
