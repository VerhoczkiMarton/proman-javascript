import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    let kula = document.querySelector("#fasz");
    kula.addEventListener("click", dom.addCardHandler);
}

init();
