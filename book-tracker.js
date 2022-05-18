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
        }
    });
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
    h3.textContent = `0 / ${goal}`;
            
    //add a progress bar to see how far
    const progress = document.createElement('progress');
    progress.setAttribute('value', `${currentRead}`);
    progress.setAttribute('max', `${goal}`)

    //add a note of encouragment for user
    const p = document.createElement('p');
    p.textContent = 'Keep Reading You Are Doing Great!!! Add a book and watch your progress soar.'

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
    .then (response => response.json());
}

//deals with submission of add a book form
function addABook() {
    const form = document.querySelector('#book-adder form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateGoal();
        form.reset();
    });
}

//makes sure progress of the goal is updated 
function updateGoal() {
    //increase the header that staes how many books have been read
    let h3 = document.querySelector('h3');
    h3Array = h3.textContent.split(' ');
    h3Array[0] = parseInt(h3Array[0]) + 1;
    const currentRead = parseInt(h3Array[0]) + 1;
    const goal = h3Array[2];
    h3.textContent = h3Array.join(' ');

    const progress = document.querySelector('progress');
    progress.value = currentRead;
}





