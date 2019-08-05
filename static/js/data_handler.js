// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
import {dom} from "./dom.js";

export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function () {
        this._api_get('/add-board', (data) => {
            let boardTemplate = `<section data-board-id="${data.id}" class="board">
                <div class="board-header"><span class="board-title">Board ${data.id}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns">
                    <div class="board-column 0">
                        <div class="board-column-title">New</div>
                        <div class="board-column-content new">
                        </div>
                    </div>
                    <div class="board-column 1">
                        <div class="board-column-title">In Progress</div>
                        <div class="board-column-content in-progress">
                        </div>
                    </div>
                    <div class="board-column 2 testing">
                        <div class="board-column-title">Testing</div>
                        <div class="board-column-content testing">
                        </div>
                    </div>
                    <div class="board-column 3 done">
                        <div class="board-column-title">Done</div>
                        <div class="board-column-content done">
                        </div>
                    </div>
                </div>
            </section>`;
            dom.addBoard(boardTemplate);
        });
    },
    createNewCard: function (boardId) {
        // creates new card, saves it and calls the callback function with its data
        this._api_get(`/add-card/${boardId}`, (data)=>{
            let cardTemplate = `<div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${data.title}</div>
                        </div>`;
            dom.addCard(cardTemplate, boardId);
        });

    }
    // here comes more features
};
