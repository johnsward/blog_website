import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import '../css/imagegrid.css';

const ImageGrid = ({ onDrop }) => {
    const [files, setFiles] = useState(Array(9).fill(null));

    const handleDrop = (index) => (file) => {
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
        onDrop(newFiles);
    };

    const handleRemove = (index) => () => {
        const newFiles = [...files];
        newFiles[index] = null;
        setFiles(newFiles);
    };

    return (
        <div className="image-grid">
            {files.map((file, index) => (
                <DragAndDrop 
                    key={index} 
                    file={file} 
                    onDrop={handleDrop(index)} 
                    onRemove={handleRemove(index)} 
                />
            ))}
        </div>
    );
};

export default ImageGrid;
