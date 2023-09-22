const name = 'Buse'
const userAge = 21

const user = {
    name,
    age: userAge,
    location: 'TR'
}

console.log(user)

//Object Destructring

const product = {
    label: 'Purple Notebook',
    price: 25,
    stock: 182,
    salePrice: undefined
}

// const label=product.label
// const stock=product.stock

// const { label: productLabel, price, salePrice = 15, rating } = product

// //renaming with :
// //give values to undefined object values

// console.log(productLabel)
// console.log(price)
// console.log(salePrice)
// console.log(rating)

const transaction = (type, { label, stock }) => //destructering of outside arguement
{
    console.log(type, label, stock)
}

transaction('order', product)