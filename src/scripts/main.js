import { fetchRequests } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js" 
import { SinkRepair } from "./SinkRepair.js"

/* You need to fetch the data from the API and store it in application state before you can convert the data structures to HTML representations. The syntax here is very confusing for a beginner, and your instruction team will explain the logic when they do a live coding review. */ 

/* original code */ 

// const mainContainer = document.querySelector("#container")

// const render = () => {
//     fetchRequests().then(
//         () => {
//             mainContainer.innerHTML = SinkRepair()
//         }
//     )
// }

// render()

/* Then update your main.js to request both resources using the following syntax. Notice the new .then() method which, in turn, invokes the fetchPlumbers function. */ 

/* updated code */ 

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

/* Now your main module has to listen for the custom event and invoke the render() function to build all the HTML again. */ 

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

