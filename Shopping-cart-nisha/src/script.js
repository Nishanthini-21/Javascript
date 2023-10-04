let products=document.getElementById("products")

let basket= JSON.parse(localStorage.getItem("data")) || []
console.log(basket)
let generateproducts=()=>{
    return products.innerHTML=productsarrayData.map((x)=>{
        let {id, pname, price, desc, img}=x
        let search = basket.find((x) => x.id === id) || [];
        return `<div class="item">
        <img width="220" src="${img}" alt="cloth">
        <div class="description">
            <h2>${pname}</h2>
            <p>${desc}</p>
            <div class="price-qty">
                <h3>$ ${price}</h3>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div class="quantity" id=${id}>
                        ${search.item===undefined?0:search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`
    }).join("")
}

generateproducts()




let increment = (id) => { 
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    }
    else
    {
        search.item += 1;
    }

    update(id)
    localStorage.setItem("data",JSON.stringify(basket))
}


let decrement=(id)=>{
    let search = basket.find((x) => x.id === id);

    if(search===undefined){
        return
    }
    else if (search.item === 0){
        return
    }
    else
    {
        search.item -= 1;
    }

    update(id)
    basket=basket.filter((x)=>x.item !==0);
    localStorage.setItem("data",JSON.stringify(basket))
}

let update=(id)=>{
    let search= basket.find((x)=> x.id===id)
    document.getElementById(id).innerHTML=search.item
    calculate()
}

let calculate=()=>{
    let cartqty=document.getElementById("cartqty")
    cartqty.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
    // console.log((basket.map((x)=>x.item)).reduce((x,y)=>x+y,0))
}   

calculate()