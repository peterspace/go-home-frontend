import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function Spinner({className=''}) {
  return (
    <span className={`${className}`}><AiOutlineLoading className="animate-spin" /></span>
  )
}

export default Spinner