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

### Configuration

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

## Usage
To use the application you begin by adding the amount of books that you would like to read for the year. Once that is completed you may start adding the book you have read. To add the book you will need to input the title and the isbn number. A rating of the book can be added as well but is not necessary to track the book.

Once the book is added the progress of your goal should be updated and you should see a box on the page with the title, cover, author and your rating of the book. If the information is not found by the API it will still be tracked but the information not found will be replaced by the default provided.

If there are any books you would like to delete, you may click on the 'x' on the upper left hand corner of the box. You may also choose to sort the order of the books, by either date added, highest-to-lowest ratings or lowest-to-highest ratings.

## Project Status
This application is finished for the time being, may be expanded at a later date.


