//survey field contains logic to render a single lable field
import React from 'react';
export default ({input,label,meta:{error, touched} }) => {
  //props.int contains lots of properties, like meta, onBlur, onChange...
  return (
    <div>
    <label>{label}</label>
    <input {...input} style={{marginBottom:'5px'}}/>
    <div className="red-text" style={{marginBottom:'20px' }}>
      {touched && error}
    </div>
    </div>
  );
}
