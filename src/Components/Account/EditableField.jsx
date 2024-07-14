import { useState } from 'react';
import './profile.css';

const EditableField = ({ value, onSave, type = 'text' ,field}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
        setIsEditing(false);
        onSave(inputValue);
    };

    const handleFileChange = (event) =>{
        const file=event.target.files[0];
        if(file){
            setIsEditing(false);
            onSave(file,field);
        }
    }
    
    return (
        type==='file'?
        (
            <>
                <label htmlFor={`imageInput-${field}`}>
                    <div className='editIconDiv'>
                        <h1>Edit</h1>
                    </div>
                </label>
                <input
                 type="file" 
                 id={`imageInput-${field}`}
                 style={{display:"none"}} 
                 onChange={handleFileChange}
                 onClick={(event) => event.target.value = null}
                 />
            </>
        ):
        (
            isEditing ? 
            (
                <input
                    type={type}
                    defaultValue={value}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleSave}
                    className='profile-input'
                    autoFocus
                />
            ) : (
                <span onClick={() => setIsEditing(true)}>
                    {value || 'click To Edit'}
                </span>
            )
        )
    )
        
};

export default EditableField;
