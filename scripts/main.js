import { KneelDiamonds } from "./KneelDiamonds.js"

const mainContainer = document.querySelector("#container")

const renderAllHTML = () => {
    mainContainer.innerHTML = KneelDiamonds()//KneelDiamonds.js is making all the HTML and this module adds it all to the main page (id = "container")
}

renderAllHTML()

document.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderAllHTML()//since a new order has been added to the database, the HTML of the page is rendered again (the page is refreshed) to display the new order
})
