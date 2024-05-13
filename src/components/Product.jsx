import React from 'react'
import { Button } from 'react-bootstrap'
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function Product({product,onADDtoCartClick}) {

  let {productName,price,brand,category,rating,isOrdered} = product

  return (
    <div className='text-light border p-3 m-3 rounded ' style={{width:'300px'}}>
<h3 className="">{productName}</h3>
<div className="d-flex justify-content-between text-info">
  <h5>#{brand.brandName}</h5>
  <h5>#{category.categoryName}</h5>
</div>
<h3>Price = <BiRupee  />
 {price.toFixed(2)}</h3>

<div className="rating">
{
  [...Array(rating).keys()].map(ele=>{
    return <FaStar key={ele} />
  })
}
{
  [...Array(5-rating).keys()].map(ele=>{
    return <CiStar key={ele} />
  })
}
</div>

<div className="mt-2">
{
isOrdered===false ?
<Button onClick={()=>onADDtoCartClick(product)} variant='warning'>Add To Cart</Button>
:
<span className='text-light'>Added to Cart !</span>
}
</div>
    </div>
  )
}

export default Product