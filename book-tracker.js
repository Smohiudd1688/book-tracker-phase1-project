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
            const p = document.createElement('p');
            p.textContent = goal.value;
            console.log(goalArea);
            goalArea.appendChild(p);
        }
        form.reset();
    });
}

