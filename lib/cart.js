

const sampleCart = [
    {
        product : {
            productId : "12324",
            name : "Sample",
            image : "Link",
            price : "200",
            labledPrice : "180"


            
        },
        qty : 1
    },
    {
        product : {
            productId : "12324",
            name : "Sample",
            image : "Link",
            price : "200",
            labledPrice : "180"
        },
        qty : 2
    }

    
]

// Read Cart Item Function

export function getCart(){

    const cartInString = localStorage.getItem("cart")

    // If user is new user. empty array save in local storage and return empty array to cart page
    
    if (cartInString == null) {
        localStorage.setItem("cart","[]")
        return []

    // If user is already exist user, Maybe he had cart items. So that cart array  return to cart page

    }else{
        const cart = JSON.parse(cartInString) // This method use to get out JSON or Array hide in a String. 
        return cart
    }

}

// This is the function use to add new items to cart

export function addToCart(product,qty){
    
    //get local storage array to cart constant
    const cart = getCart()

    

    //check if product already exists in cart

    // If the product already exists in cart. Then this function help to return that index of array to productIndex constant.
    // But Think, any product in array do not match to already exsists product. Then the function return -1 to product Index constant.

    const productIndex = cart.findIndex(
        // Item means, One of JSON in cart constant's array.
        (item)=>{
            return item.product.productId == product.productId
        }
    )


    

    if (productIndex == -1) {

        if(qty<1){
            return
            
        }
        // push new product to cart array (push means add to array)
        cart.push (
            {
                product : {
                    productId : product.productId,
                    name : product.name,
                    image : product.images[0],
                    price : product.price,
                    labledPrice : product.labledPrice,
                },
                qty : qty
            }
        )

        


        

    }else{
        cart[productIndex].qty += qty

        if (cart[productIndex].qty<1) {
            cart.splice(productIndex , 1) // splice means remove from array
        }
    }

    const cartInString = JSON.stringify(cart)
    localStorage.setItem("cart", cartInString)

}

