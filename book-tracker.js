//this event listener will wait until the dom is loaded before continuing
//add functions to be called in here
document.addEventListener('DOMContentLoaded', (event) => {
    addReadingGoal();
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
            form.remove();
            const goalArea = document.querySelector("#book-goal");

            //add a header that tells you amount of books read
            const h3 = document.createElement('h3');
            h3.textContent = `0 / ${goal.value}`;
            
            //add a progress bar to see how far
            const progress = document.createElement('progress');
            progress.setAttribute('value', '22');
            progress.setAttribute('max', `${goal.value}`)

            //add a note of encouragment for user
            const p = document.createElement('p');
            p.textContent = 'Keep Reading You Are Doing Great!!! Add a book and watch your progress soar.'

            //append all of these to the dom
            goalArea.appendChild(h3);
            goalArea.appendChild(progress);
            goalArea.appendChild(p);
        }
        form.reset();
    });
}

