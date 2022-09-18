/*

    This module contains all of the data, or state, for the
    application. It exports two functions that allow other
    modules to get copies of the state.

*/
const database = {
    styles: [
        { id: 1, style: "Classic", price: 500 },
        { id: 2, style: "Modern", price: 710 },
        { id: 3, style: "Vintage", price: 965 }
    ],
    sizes: [
        { id: 1, carats: 0.5, price: 405 },
        { id: 2, carats: 0.75, price: 782 },
        { id: 3, carats: 1, price: 1470 },
        { id: 4, carats: 1.5, price: 1997 },
        { id: 5, carats: 2, price: 3638 }
    ],
    metals: [
        { id: 1, metal: "Sterling Silver", price: 12.42 },
        { id: 2, metal: "14K Gold", price: 736.4 },
        { id: 3, metal: "24K Gold", price: 1258.9 },
        { id: 4, metal: "Platinum", price: 795.45 },
        { id: 5, metal: "Palladium", price: 1241.0 }
    ],
    customOrders: [
        {
            id: 1,
            metalId: 3,
            sizeId: 2,
            styleId: 3,
            timestamp: 1614659931693
        }
    ],
    orderBuilder: {
        metalId: 0,
        styleId: 0,
        sizeId: 0,
      
    },
}

// No other modules are allowed to have direct access to the database. That's why you have exported functions that return copies of the current state. Other modules invoke those function to get state.
export const getMetals = () => {
    return database.metals.map(metal => ({...metal}))
}

export const getSizes = () => {
    return database.sizes.map(size => ({...size}))
}
export const getStyles = () => {
    return database.styles.map(style => ({...style}))
}
export const getOrders = () => {
    return database.customOrders.map(order => ({...order}))
}
// Now you need to export functions whose responsibility is to set state. Setter functions can modify data and insert data into the database
export const setMetal = (id) => {
    database.orderBuilder.metalId = id//the id that's coming in as the input of the function will be stored in the property of the metalId
}

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
}

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
}

export const addCustomOrder = () => {
    // Copy the current state of user choices
    const newOrder = {...database.orderBuilder}//use spread operator to make a copy of the orderBuilder object

    // Add a new primary key (iD) to the orderBuilder object
    const lastIndex = database.customOrders.length - 1
    newOrder.id = database.customOrders[lastIndex].id + 1

    // Add a timestamp to the orderBuilder object
    newOrder.timestamp = Date.now()// in-built JS function that gives the time right now

    // Add the new order object to custom orders state
    database.customOrders.push(newOrder)

    // Reset the temporary state for user choices
    database.orderBuilder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
