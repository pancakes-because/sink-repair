import { getRequests } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"

/* The function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

1. The function should define 1 parameter (value will be each object in the array)
2. The description of the service request should be interpolated inside the <li> HTML representation.
3. The function should return the HTML representation.*/

/* Now that you have a function that can send a DELETE request to the API, you can add a button for the user to click and initiate that process. Add the button element right next to the text of each request. */

// added a file called "tools_emoji.png" to the "src" file
// then added an image tag that references this in the "convertRequestToListElement" function 
// this shows an hammer and wrench emoji image for each service request <li> element

/* Add an event listener to the main container (for the delete button). When the user clicks on any of the delete buttons, invoke the deleteRequest() function you just made above. Make sure you pass the id of the service request to the deleteRequest() function as an argument. */

/* You can place this <select> element wherever is easiest to start. Don't worry about the exact placement, just make sure that it is displayed for each service request. 

Note that the value of each option in the select element has the primary key of the service request AND the primary key of the plumber delimited with 2 dashes. This is because you need to have both the request and the chosen plumber to mark a job complete. */

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

/* event listener for plumbers */

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
               This object should have 3 properties
                  1. requestId
                  2. plumberId
                  3. date_created
           */

            const completion = {

                requestId: parseInt(requestId), 
                plumberId: parseInt(plumberId), 
                date_created: new Date().toString()

            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
            */

            saveCompletion(completion)
        }
    }
)

const convertRequestToListElement = (request) => {

    const plumbers = getPlumbers()
    console.log(plumbers)

    return `<li>
    
    <img src="tools_emoji.png"> 
    
    ${request.description} 

        <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
</select>

        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
}


/* You will need to define the function that will be passed to the map() method. */

/* For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

requests.map(convertRequestToListElement).join("") */

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map(convertRequestToListElement).join("")
        }
        </ul>
    `

    return html
}

