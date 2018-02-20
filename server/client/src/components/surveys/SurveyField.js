//survey field contains logic to render a single lable field
import React from 'react';
export default ({input,label,meta:{error, touched} }) => {
  //props.int contains lots of properties, like meta, onBlur, onChange...
  return (
    <div>
    <label>{label}</label>
    <input {...input}/>
    {touched && error}
    </div>
  );
}
