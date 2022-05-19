let globalID = 2;

//this event listener will wait until the dom is loaded before continuing
//add functions to be called in here
document.addEventListener('DOMContentLoaded', (event) => {
    //grab information from json file
    fetch('http://localhost:3000/bookTracker')
    .then(response => response.json())
    .then(object => {
        //if no goal has been made then continue with adding an event listener for adding a goal
        if (object[0].goalNumber === 'N/A') {
            addReadingGoal();

        //if goal has been made take saved info from file to create goal progress area
        } else {
            createGoalProgress(object[0].goalNumber, object[0].currentNumber);
    
            //go through the json file and make sure any added books stay up after a refresh
            object.forEach(book => {
                if (book.id !== 1) {
                    createBooks(book.title, book.cover, book.author, book.rating, book.id);
                }
            });
        }
    })
    .catch((error) => alert('Whoops Something Went Wrong'));

    addABook();
    
});

//deals with the submission of the reading goal form
function addReadingGoal () {
    const form = document.querySelector('#book-goal form');
    form.addEventListener('submit', (event) => {
        //stops page from automatically reloading and select input field
        event.preventDefault();
        const goal = form.querySelector('#book-goal-entry');

        //makes sure what is entered is a number and is postive, if not sent alert
        if (typeof(parseInt(goal.value)) <= 0 || isNaN(goal.value))
        {
            alert('Please enter a number greater than 0.');

        //if input is a number than remove form and add progress bar to dom
        } else {
            createGoalProgress(goal.value, 0);
        }
        form.reset();
    });
}

//goal progress area is created and json file is updated
function createGoalProgress(goal, currentRead) {
    const form = document.querySelector('#book-goal form');
    form.remove();
    const goalArea = document.querySelector("#book-goal");

    //add a header that tells you amount of books read
    const h3 = document.createElement('h3');
    h3.textContent = `${currentRead} / ${goal}`;
            
    //add a progress bar to see how far
    const progress = document.createElement('progress');
    progress.setAttribute('value', `${currentRead}`);
    progress.setAttribute('max', `${goal}`)

    //add a note of encouragment for user
    const p = document.createElement('p');
    if (currentRead < goal) {
        p.textContent = 'Keep Reading You Are Doing Great!!! Add a book and watch your progress soar.';
    } else {
        p.textContent = 'WooHoo!! You Reached Your Goal!';
    }
    p.setAttribute('id', 'message');
    

    //append all of these to the dom
    goalArea.appendChild(h3);
    goalArea.appendChild(progress);
    goalArea.appendChild(p);

    fetch('http://localhost:3000/bookTracker/1', {
        method: 'PATCH',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            'goalNumber': goal,
            "currentNumber": currentRead
        })
    })
    .then (response => response.json())
    .catch((error) => alert('Whoops Something Went Wrong'));
}

//deals with submission of add a book form
function addABook() {
    const form = document.querySelector('#book-adder form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const rating = document.querySelector("#book-rating").value;
        const titleInput = document.querySelector('#book-title').value;
        const isbn = document.querySelector('#book-isbn');

        if(typeof(parseInt(isbn.value)) <= 0 || (isbn.value.length !== 10 && isbn.value.length !== 13)) {
            alert("Enter a valid 10 or 13 digit ISBN number");
        } else {
            //send 1 so the current read amount will decrease
            updateGoal(1);
            findBooks(rating, titleInput);
        }
        form.reset();
    });
}

//when book is added it will seach through the open library api based on isbn inputed
function findBooks(rating,titleInput) {
    const isbn = document.querySelector('#book-isbn');

    fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn.value}&jscmd=details&format=json`)
    .then(response => response.json())
    .then(object => addBookToList(object, rating, titleInput));
}

//if isbn matches find the data we need to diplay and save to send to necessdary functions
function addBookToList(object, rating, titleInput) {
    const bookObject = object[Object.keys(object)[0]];
    let cover = "data:image/png;base64,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";
    
    //if api is unable to find book use inputed info to add book, not all book available on database
    if (bookObject === undefined) {
        const noAuthor = 'Unknown';
        postBook(titleInput, cover, noAuthor, rating);
        createBooks(titleInput, cover, noAuthor, rating);
    } else {
        const title = bookObject.details.title;
        const author = bookObject.details.authors[0].name;
        cover = bookObject["thumbnail_url"];

        //some covers arent available so if not display an image to replace it
        if (cover === undefined) {
            cover = "data:image/png;base64,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";
        }

        postBook(title, cover, author, rating);
        createBooks(title, cover, author, rating);
    }

    globalID++;
    
}

//creates the book card that will be displayed
function createBooks(title, cover, author, rating, id = globalID) {
    const bookArea = document.querySelector('#book-display');
    const book = document.createElement('div');
    book.setAttribute('class', 'book');
    book.setAttribute('id', `${id}`)
    
    const deleteE = document.createElement('p');
    deleteE.textContent = 'x';
    deleteE.setAttribute('id', 'delete');
    deleteE.addEventListener('click', handleDelete);

    //title of the book
    const titleE = document.createElement('h3');
    titleE.textContent = title;

    //book cover
    const coverE = document.createElement('img');
    coverE.src = cover;
    coverE.setAttribute('class', 'book-cover');

    //author of the book
    const authorE = document.createElement('p');
    authorE.textContent = `By ${author}`;

    //user rating and create the text content based on rating
    const ratingE = document.createElement('p')
    if (rating === '-') {
        ratingE.textContent = 'No Rating'
    } else {
        ratingE.textContent = '★'
        for (let i = 1; i < rating; i++) {
            ratingE.textContent = `${ratingE.textContent} ★`;
        }
    }
    ratingE.setAttribute('id', 'rating');

    //add all of these new elements to the dom
    book.appendChild(deleteE);
    book.appendChild(titleE);
    book.appendChild(coverE);
    book.appendChild(authorE);
    book.appendChild(ratingE);
    bookArea.appendChild(book);
}

//if x is clicked then that book will be deleted from dom and goal will update
function handleDelete(event){
    const bookId = event.target.parentNode.id;
    event.target.parentNode.remove();

    fetch(`http://localhost:3000/bookTracker/${bookId}`, {
        method: 'DELETE',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
    .then(response => response.json())
    .catch((error) => alert('Whoops Something Went Wrong'));

    //send -1 so the current read amount will decrease
    updateGoal(-1);
}

//posts necessary information to the database
function postBook(title, cover, author, rating) {
    fetch('http://localhost:3000/bookTracker', {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            'title': title,
            'cover': cover,
            'author': author,
            'rating': rating
        })
    })
    .then (response => response.json())
    .catch((error) => alert('Whoops Something Went Wrong'));
}

//makes sure progress of the goal is updated 
function updateGoal(numToAdd) {
    //increase the header that states how many books have been read
    let h3 = document.querySelector('h3');
    h3Array = h3.textContent.split(' ');
    h3Array[0] = parseInt(h3Array[0]) + numToAdd;
    const currentRead = parseInt(h3Array[0]);
    const goal = h3Array[2];

    const message = document.querySelector('#message');
    if(currentRead >= goal) {
        message.textContent = 'WooHoo!! You Reached Your Goal!';
    } else {
        message.textContent = 'Keep Reading You Are Doing Great!!! Add a book and watch your progress soar.';
    }

    h3.textContent = h3Array.join(' ');

    //progress bar
    const progress = document.querySelector('progress');
    progress.value = currentRead;

    fetch('http://localhost:3000/bookTracker/1', {
        method: 'PATCH',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "currentNumber": currentRead
        })
    })
    .then (response => response.json())
    .catch((error) => alert('Whoops Something Went Wrong'));
}









