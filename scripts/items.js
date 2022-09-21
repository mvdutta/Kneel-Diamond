import { getItem, setItem } from "./database.js";

const items = getItem()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "item") {
            setItem(parseInt(event.target.value))
        }
    }
)


export const Items = () => {
    let html = '<div class="item">'
    const listItems = items.map(item => {
        return `<input type="radio" name="item" value="${item.id}" /> ${item.type}
        `
    })
    html += listItems.join("")
    html += "</div>"
    return html
    
}