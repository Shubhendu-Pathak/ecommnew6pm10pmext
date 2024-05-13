import React, { useState } from 'react'

function Order(props) {

let [data] = useState(props)
// console.log(data);

let {isPaymentCompleted, orderId, price, productId,productName, quantity,userId,onBuyNow,    onDeleteClick
    } = data

    console.log(isPaymentCompleted);

    // console.log('Order COMPO');
  return (
    <div className='border border-success border-3 p-3 w-75 rounded-2  my-3 m-auto'>
        <h4 className='fst-italic pb-2 border-bottom text-center '>{productName}</h4>
        
        <h5>Quantity = {quantity}</h5>
        <p className='lead'>Price = ${price}</p>

{
  isPaymentCompleted===true ?
  ""
  :
  <div className="buttons p-2 d-flex justify-content-evenly ">
    <button
    onClick={()=>onBuyNow(orderId,userId,productId,quantity)}
    className='btn btn-outline-success text-primary'>Buy Now</button>
    <button
     onClick={()=>onDeleteClick(orderId)}
     className='btn btn-outline-danger text-primary'>Remove</button>

</div>

}

    </div>
  )
}

export default React.memo(Order)