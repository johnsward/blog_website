import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); 
        setImages(prevImages => [...prevImages, ...files]);
        onImageUpload(files); 
    };

    return (
        <div className="image-upload-container">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            <div className="image-preview-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="image-preview"
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
