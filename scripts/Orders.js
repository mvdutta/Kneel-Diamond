import { getMetals, getOrders } from "./database.js"

const buildOrderListItem = (order) => {
    const metals = getMetals()//getting a list of metal objects
    const foundMetal = metals.find(//finding the metal object that pertains to this order. "metal" is going to iterate through every metal in metals and find the metal whose id matches the metalId of order. Find requires a helper function which returns true if the required object is found
        (metal) => {
            return metal.id === order.metalId //if these two are equal, then true is returned. If not equal, then false is returned. 
        }
    )
    const totalCost = foundMetal.price ///found the price of this metal
    //next, interpolate the price in the HTML string
    const costString = totalCost.toLocaleString("en-US", {style: 
    "currency", currency: "USD"})
    return `<li>
        Order #${order.id} was placed on ${order.timestamp} and costs ${costString}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
   //we are calling getOrders here because we want to copy the orders after the customer has placed an order...we want to get the most recent copy of the orders after the customer has placed an order. In the other cases, it is just getting a copy of the order when the file is loaded
    const orders = getOrders()
    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

