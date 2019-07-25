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
        });
    },
    showBoards: function (boards) {

        //TODO: onload, show existing boards

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (let board of boards) {
            let boardId = 'Board '+board.id;
            let boardSection = `<section class="board" id="${boardId}">
                <div class="board-header"><span class="board-title">${boardId}</span>
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
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
    addBoard: function (board) {
        let boardContainer = document.querySelector('.board-container');
        boardContainer.innerHTML += board;
    },
    addCard: function (card, boardId) {
        document.querySelector('.board-column-content').innerHTML += card;
    },
    addCardHandler: function () {
        let boardContainer = document.querySelector('.board-container');
        let addButtons = boardContainer.querySelectorAll(".board-add");
        addButtons[addButtons.length - 1].addEventListener("click", e => {
            let boardId =  e.target.parentElement.parentElement.id;
            dataHandler.createNewCard(boardId)
        })
    }
};

