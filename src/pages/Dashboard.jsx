import React, { useCallback, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoReloadCircleSharp } from "react-icons/io5";
import { useAuth } from '../context-data';
import { OrderService, ProductService } from '../utility/utils';
import Order from '../components/Order';

function Dashboard() {

let [orders,setOrders] = useState([])

//get context data
  let  {data} =useAuth()


let loadFromDb = useCallback(async()=>{

  let orderResp = await fetch(`http://localhost:4000/orders?userId=${data.currentUserId}`)
  if(orderResp.ok){
    let orderRespBody = await orderResp.json()
    // console.log(orderRespBody);

    //get products
    let prodResp =  await ProductService.fetchProducts() 
    if(prodResp.ok){
      let prodRespBody = await prodResp.json()
      // console.log(prodRespBody);

 //merge the matching product with ordr productID
 orderRespBody.forEach(ele=>{
  ele.product = ProductService.getProductByProductID(
    prodRespBody,ele.productId)
 })

    }
   
    setOrders(orderRespBody)
  }else{
    console.log('orders not Fetched Sunccessfully');
  }

},[data?.currentUserId])

useEffect(()=>{
  document.title='Dashboard'
  loadFromDb()
},[data?.currentUserId, loadFromDb])

//buy now click
let onBuyNow = useCallback(async(orderId,userId,productId,quantity)=>{
    // console.log(orderId,userId,productId,quantity);
  
if(window.confirm('Wanna Buy !!!!!')){
  let updateOrder = {
    id:orderId,
    userId:userId,
    productId:productId,
    quantity:quantity,
    isPaymentCompleted:true
  }

  let res = await fetch(`http://localhost:4000/orders/${orderId}`,{method:'PUT',body:JSON.stringify(updateOrder),headers:{"Content-type":"application/json"}})
  let resBody = await res.json()
  console.log(resBody);

  loadFromDb()
}


},[loadFromDb])

//on deeltee click
let onDeleteClick = useCallback(async(orderId)=>{
if(window.confirm('Remove From BAG ?')){
  let res = await fetch(`http://localhost:4000/orders/${orderId}`,{method:"DELETE"})
  let resBody = await res.json()
  console.log(resBody);
  
  loadFromDb()
}
 
},[loadFromDb])


  return (
   <div className="">
    
    <h1 className="display-4 border-bottom border-success shadow-lg  p-2 d-flex justify-content-between  align-items-center ">
      DASHBOARD
      <button 
      onClick={loadFromDb}
      className='fs-4 btn btn-warning'>Refresh <IoReloadCircleSharp className='fs-1'  /></button>
    </h1>
    <Container>
      <Row>
        {/* prevorder */}
        <Col  xs={10} md={5} className='bg-light offset-1 my-3  '>
          <h3>Previous Orders</h3>

          {OrderService.getPrevOrders(orders).length === 0 ? <h1 className='text-danger'>NO Previous ITEMS </h1>:'' }
{
  OrderService.getPrevOrders(orders).map(ele=>{
    return <Order key={ele.id}
    orderId={ele.id}
    productId={ele.productId}
    userId={ele.userId}
    isPaymentCompleted={ele.isPaymentCompleted}
    quantity={ele.quantity}
    price={ele.product?.price}
    productName={ele.product?.productName}
    onBuyNow={onBuyNow}
    onDeleteClick={onDeleteClick}
    
    />
  })
}
        </Col>
           {/* prevorder */}
        <Col xs={10} md={5} className=' offset-1 my-3'>
          <h3>My Cart</h3>
{OrderService.getCart(orders).length === 0 ? <h1 className='text-danger'>NO ITEMS IN BAG</h1>:'' }

          {
  OrderService.getCart(orders).map(ele=>{
    return <Order key={ele.id}
    orderId={ele.id}
    productId={ele.productId}
    userId={ele.userId}
    isPaymentCompleted={ele.isPaymentCompleted}
    quantity={ele.quantity}
    price={ele.product?.price}
    productName={ele.product?.productName}
    onBuyNow={onBuyNow}
    onDeleteClick={onDeleteClick}
    />
  })
}
        </Col>
      </Row>
    </Container>
   </div>
  )
}

export default Dashboard