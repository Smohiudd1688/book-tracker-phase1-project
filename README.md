# Book Tracker

This application is a book tracker where you can set a goal and update your progress by adding the books that you have finished reading. The books are then displayed and the information of the book is found through the [Open Library API](https://openlibrary.org/dev/docs/api/books)

## Getting Started

### Installation

1. Clone the repository and cd into the folder.
2. Make sure Google Chrome is your default browser, may not work correctly otherwise.
3. In terminal open the html file using the code below.
    ```bash
    open index.html
    ```
4. You are ready to start using the application!

## Configuration

In order for the application to run correctly you will need to run a JSON server to replicate a full REST API. To do this you will need to:
1. Install the JSON server in terminal (either globally or locally) by running this code:
    ```bash
    npm install -g json-server
    ```
2. Then cd into directory where `db.json file` is stored, if not already
3. Lastly, run the following code:
    ```bash
    json-server --watch db.json
    ```

Note: If you want to reset the goal input change `goalNumber` in db.json file to "N/A"




