import React from 'react'

export const ErrorMessageBox = ({ errorMessage }) => {
  return (
    <div className='className="w-full text-red-600 bg-red-50 border-red-600 border-[1px] rounded-md mt-1 text-center p-1'>
      <small>{ errorMessage }</small>
    </div>
  )
}