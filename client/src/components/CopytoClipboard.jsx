import React from 'react'
import { FaClipboard } from "react-icons/fa";
import { toast } from 'react-toastify';

const handleCopy = async({text}) => {
    console.log(text);
    if(text !=null && text!= undefined){
        await navigator.clipboard.writeText(text);
        toast.success('Text copied to clipboard');
    }
    return;
}

const CopytoClipboard = (text) => {
  return (
      <FaClipboard onClick={() => {handleCopy(text)}}/>
  )
}

export default CopytoClipboard
