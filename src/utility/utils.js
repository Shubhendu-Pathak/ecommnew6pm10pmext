export const OrderService = {
    getPrevOrders(odarr){
return odarr.filter((ele)=>ele.isPaymentCompleted===true)
    },
    getCart(odarr){
        return odarr.filter((ele)=>ele.isPaymentCompleted===false)
            }
}

export const ProductService={
    fetchProducts(){
        return fetch('http://localhost:4000/products',{method:'GET'})
    },
    getProductByProductID(prodArr,prodId){
        return prodArr.find(ele=>ele.id==prodId)
    }
}

export const BrandService= {
    fetchBrands(){
        return fetch(`http://localhost:4000/brands`,{method:'GET'})
    },
    getBrandByBrandId(brandArr,prodBrandId){
        return brandArr.find(ele=>{
            return ele.id==prodBrandId
        })
    }

}

export const CategoryService = {
    fetchCatagory(){
        return fetch('http://localhost:4000/categories')
    },
    getCategoryByCategoryId(catArr,prodCatId){
return catArr.find(ele=>{
    return ele.id == prodCatId
})
    }
}

