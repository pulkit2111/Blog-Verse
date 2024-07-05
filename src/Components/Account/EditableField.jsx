import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './profile.css';

const EditableField = ({ value, onSave, type = 'text' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
        setIsEditing(false);
        onSave(inputValue);
    };

    return (
        type==='file'?
        (
            <>
                <label htmlFor="imageInput">
                    <div className='editIconDiv'>
                        <EditIcon onClick={() => setIsEditing(true)} className='editIcon'/>
                    </div>
                </label>
                <input
                 type="file" 
                 id='imageInput'
                 style={{display:"none"}} 
                 onChange={(e)=>{
                    onSave(e);
                 }}/>
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
