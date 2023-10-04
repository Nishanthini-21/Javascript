let shoppingcart=document.getElementById("shoppingcart")
let label=document.getElementById("label")

let basket= JSON.parse(localStorage.getItem("data")) || []

let calculate=()=>{
    let cartqty=document.getElementById("cartqty")
    cartqty.innerHTML=basket.map((x)=>x.item).reduce((x,y)=> x+y,0)
}   
calculate()

let generatecartitems=()=>{
    if(basket.length!==0){
        return shoppingcart.innerHTML=basket.map((x)=>{
            let {id,item}=x
            let search=productsarrayData.find((y)=>y.id===id) || []
            let {img,price,pname}=search
            return `
            <div class="cart-item">
                <img width="100" src="${img}" />
                <div class="details">
                    <div class="name-price-x">
                        <h4 class="title-price">
                            <p>${pname}</p>
                            <p class="cart-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeitem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons cart-buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div class="quantity" id=${id}>${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3 class="tot">$ ${item * price}</h3>
                </div>
            </div>
            `
        }).join("")
    }
    else{
        shoppingcart.innerHTML=``
        label.innerHTML=`<h2>Your Cart is Empty</h2>
        <a href="index.html"><button class="btn-home">Back to Home</button></a>`
    }
}
generatecartitems()


let increment = (id) => {
    let selectedItemId = id; 
    let search = basket.find((x) => x.id === selectedItemId);
    if (search === undefined) 
    {
        basket.push({
            id: selectedItemId,
            item: 1,
        })
    } 
    else 
    {
        search.item += 1;
    }

    update(id)
    generatecartitems()
    localStorage.setItem("data",JSON.stringify(basket))
}


let decrement=(id)=>{
    let selectedItemId = id;

    let search = basket.find((x) => x.id === selectedItemId);
    if(search===undefined) return;
    else if (search.item === 0) return;
    else
    {
        search.item -= 1;
    }

    update(id)
    basket=basket.filter((x)=>x.item !==0);
    generatecartitems()
    localStorage.setItem("data",JSON.stringify(basket))
}


let update=(id)=>{
    let search= basket.find((x)=> x.id===id)
    document.getElementById(id).innerHTML=search.item
    calculate()
    totalamt()
}


let removeitem=(id)=>{
    basket=basket.filter((x)=>x.id!==id)
    generatecartitems()
    totalamt()
    calculate()
    localStorage.setItem("data",JSON.stringify(basket))
}


let clearcart=()=>{
    basket=[]
    generatecartitems()
    calculate()
    localStorage.setItem("data",JSON.stringify(basket))
}


let totalamt=()=>{
    if(basket.length!==0)
    {
    let amount=basket.map((x)=>{
        let {id,item}=x
        let search=productsarrayData.find((y)=>y.id===id) || []
        return item*search.price
    }).reduce((x,y)=>x+y,0)

    label.innerHTML=`
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearcart()" class="clearcart">Clear Cart</button>
    `
    }
    else
    {
        return
    }
}

totalamt()