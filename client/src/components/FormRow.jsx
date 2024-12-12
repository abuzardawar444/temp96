import React from 'react'
import CopytoClipboard from './CopytoClipboard'

const FormRow = ({type, name, labelText, placeholder, defaultValue, onChange}) => {
  return (
    <div className="form-row">
        <label htmlFor={name} className='form-label'>
          {labelText || name} {name === 'remarks' ? <CopytoClipboard text={defaultValue}/> : ''}
        </label>
        <input type={type} id={name} name={name} className='form-input' placeholder={placeholder || labelText} 
              defaultValue={defaultValue} required onChange={onChange}/>
    </div>
  )
}

export default FormRow
