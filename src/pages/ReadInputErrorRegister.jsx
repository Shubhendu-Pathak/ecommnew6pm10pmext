import { ErrorMessage } from 'formik'
import React from 'react'

function ReadInputErrorRegister({name}) {
  return (
    <div className='text-danger fst-italic fw-bolder'>
        <ErrorMessage name={`${name}`}/>
    </div>
  )
}

export default ReadInputErrorRegister