import { defineStore } from "pinia";

export default defineStore("cart",  {
    state: ()=> ({
        isCartVisible: false,
        cartItems: [],
        countedItems: 0,
    }),
    actions: {
        addToCart(product){
            let isProductInTheCart = false;
            console.log(product);
            this.cartItems.forEach((item)=> {
                if(product.id===item.id) {
                    isProductInTheCart=true;
                    item.quantity++;
                    this.countedItems++;
                }
            })
            if(!isProductInTheCart){
                product.quantity = 1;
                this.cartItems.push(product);
                this.countedItems++;
            }
            
        },
        countItems() {
            this.countedItems = 0;
            this.cartItems.forEach((item)=> {
                if(item.quantity <= 0) {item.quantity=1;}
                this.countedItems += item.quantity;
            })
        },
    }
});