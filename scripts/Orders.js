import { getMetals, getOrders, getSizes, getStyles } from "./database.js"

const buildOrderListItem = (order) => {
    const metals = getMetals()//getting a list of metal objects
    const foundMetal = metals.find(//finding the metal object that pertains to this order. "metal" is going to iterate through every metal in metals and find the metal whose id matches the metalId of order. Find requires a helper function which returns true if the required object is found
        (metal) => {
            return metal.id === order.metalId //if these two are equal, then true is returned. If not equal, then false is returned. 
        }
    )
    const styles = getStyles()//getting a list of style objects
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId 
        }
    )
    const sizes = getSizes()//getting a list of size objects
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId 
        }
    )
    const totalCost = foundMetal.price + foundStyle.price + foundSize.price//add all of the above prices to totalCost string
    //next, interpolate the price in the HTML string
    const costString = totalCost.toLocaleString("en-US", {style: 
    "currency", currency: "USD"})

    const dateObj = new Date(order.timestamp)//added dateObj with new Date to display current date. Then used dateObj.toDateString() below to return the date in a human readable format
    return `<li>
        Order #${order.id} was placed on ${dateObj.toLocaleDateString()} and costs ${costString}
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

