// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.insertBefore(childNode, elementToExtend.firstChild);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
        document.querySelector('.board-add').addEventListener('click', () => {
            dataHandler.createNewBoard();
        })

    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            dom.addCardHandler();
        });
    },
    showBoards: function (boards) {

        //TODO: onload, show existing boards

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (let board of boards) {
            let boardSection = `<section class="board" data-board-id="${board.id}">
                <div class="board-header"><span class="board-title">${'Board '+board.id}</span>
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
                    <div class="board-column 2">
                        <div class="board-column-title">Testing</div>
                        <div class="board-column-content testing">
                        </div>
                    </div>
                    <div class="board-column 3">
                        <div class="board-column-title">Done</div>
                        <div class="board-column-content ">
                        </div>
                    </div>
                </div>
            </section>`;
            document.querySelector('#boards').innerHTML += boardSection;
            this.loadCards(board.id);
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler._api_get(`/get-cards/${boardId}`, (cards) => { this.showCards(cards, boardId) });
    },
    showCards: function (cards, boardID) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            let cardHTML = `<div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${card.title}</div>
                        </div>`;
            this.addCard(cardHTML, boardID);
        }
    },
    // here comes more features
    addBoard: function (board) {
        let boardContainer = document.querySelector('.board-container');
        boardContainer.innerHTML += board;
        let cardHandler = dom.addCardHandler();
        boardContainer.lastElementChild.querySelector('.board-header .board-add').addEventListener('click', cardHandler);
    },
    addCard: function (card, boardId) {
        let board = document.querySelectorAll(`[data-board-id="${boardId}"]`)[0];
        let column = board.querySelector('.board-column');
        column.querySelector('.board-column-content').innerHTML += card;
    },
    addCardHandler: function () {
        let boardContainer = document.querySelector('.board-container');
        let addButtons = boardContainer.querySelectorAll(".board-add");
        for (let addButton of addButtons) {
            addButton.addEventListener("click", e => {
                let boardId =  e.target.parentElement.parentElement.dataset.boardId;
                dataHandler.createNewCard(boardId)
            })
        }
    }
};

