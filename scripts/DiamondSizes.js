import { getSizes, setSize } from "./database.js"

const sizes = getSizes()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSize(parseInt(event.target.value))
        }
    }
)

export const DiamondSizes = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    // The map() array method is a conversion tool. It generates a new array with as many items as are in the original array, but in the new array, it puts items ***in the form that you specify***

    const listItems = sizes.map(size => {
        return `<li>
            <input type="radio" name="size" value="${size.id}" /> ${size.carats}
        </li>`
    })
    // So an object comes into your function, and a string gets returned. That string goes into a new array. Because .map() produces a new array with the items items of the original array transformed based on our instructions(the function we gave to map), we need to use .join() to join the individual strings together b/c we don't want an array
     html += listItems.join("")//joins strings in the array list items together. In this case, the separator (i.e what goes inside the parenthesis) is an empty string, which means there will be nothing in between the list items. You can put anything inside the (), and that will appear between the list items
    html += "</ul>"

    return html
}

