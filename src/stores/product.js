import { defineStore } from "pinia";

export default defineStore("product",  {
    state: ()=> ({
        test: 'Ovo je test.',
        products: [
            {
                id: 1,
                name: 'product 1',
                price: 1,
                img: 'product1.png',
            },
            {
                id: 2,
                name: 'product 2',
                price: 2,
                img: 'product2.png',
            },
            {
                id: 3,
                name: 'product 3',
                price: 3,
                img: 'product3.png',
            },
            {
                id: 4,
                name: 'product 4',
                price: 5,
                img: 'product2.png',
            },
            {
                id:5,
                name: 'product5',
                price:4,
                img: 'product4.png',
            },
            {
                id: 6,
                name: 'product 6',
                price: 6,
                img: 'product5.png',
            },
            {
                id: 7,
                name: 'product 7',
                price: 5,
                img: 'product6.png',
            },
        ]
    }),
});