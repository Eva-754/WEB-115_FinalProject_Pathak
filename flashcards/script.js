//labeling canvas and context for drawing flashcards
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// creating the flashcards class first
class Flashcard {
    constructor(question, answer, subject, difficulty = "easy") {
        this.question = question;
        this.answer = answer;
        this.subject = subject;

        //default value for difficulty is set to "easy" if not provided
        this.difficulty = difficulty;
    }
}

// creating deck class to hold multiple flashcards + logic
class Deck {
    //load cards from json or we can start from an empty array
    constructor() {
        this.cards = JSON.parse(localStorage.getItem("flashcards")) || [];

        this.currentIndex = 0; //current card index
        this.showAnswer = false; //flag to toggle between question and answer
        this.currentSub = "AP Lang"; //default subject
    }

    //using localstorage to save flashcards
    savelocal() {
        localStorage.setItem("flashcards", JSON.stringify(this.cards));
    }

    //make sure to only load def. cards if there are no cards
    loadDefaultCards() {
        if (this.cards.length > 0) return; //don't load if cards already exist
        
    this.cards = [
        new Flashcard("What is a metaphor?", "A comparison without like or as", "AP Lang"),
        new Flashcard("What is tone?", "Author's attitude toward the subject", "AP Lang"),
        new Flashcard("What is diction?", "Word choice used by the author", "AP Lang"),
        new Flashcard("What is imagery?", "Language that appeals to the senses", "AP Lang"),
        new Flashcard("What is ethos?", "Appeal to credibility or trust", "AP Lang"),
        new Flashcard("What is pathos?", "Appeal to emotion", "AP Lang"),
        new Flashcard("What is logos?", "Appeal to logic or reason", "AP Lang"),
        new Flashcard("What is a thesis?", "Main argument of a text", "AP Lang"),
        new Flashcard("What is symbolism?", "When something represents a deeper meaning", "AP Lang"),
        new Flashcard("What is irony?", "Contrast between expectation and reality", "AP Lang"),

        new Flashcard("What is a function?", "A relation where each input has exactly one output", "AP PreCalc"),
        new Flashcard("What is a derivative?", "Rate of change of a function", "AP PreCalc"),
        new Flashcard("What is a limit?", "Value a function approaches", "AP PreCalc"),
        new Flashcard("What is domain?", "All possible input values", "AP PreCalc"),
        new Flashcard("What is range?", "All possible output values", "AP PreCalc"),
        new Flashcard("What is an asymptote?", "A line a graph approaches but never touches", "AP PreCalc"),
        new Flashcard("What is an inverse function?", "A function that reverses another function", "AP PreCalc"),
        new Flashcard("What is a composite function?", "A function inside another function", "AP PreCalc"),
        new Flashcard("What is exponential growth?", "Growth that increases by a constant factor", "AP PreCalc"),
        new Flashcard("What is a logarithm?", "Inverse of an exponential function", "AP PreCalc")

    ];
     
        this.savelocal();
    }

    //filter cards to get those of the current subject
    getfilter() {
        return this.cards.filter(card => card.subject === this.currentSub);
    }

    //get current card from filtered list
    getcurrent() {
        return this.getfilter()[this.currentIndex];
    }

    //adding a new card and checking duplicity
    add(card) {
        if (this.cards.some(c => c.question.toLowerCase() === card.question.toLowerCase())) {
            alert("Card already exists!");
            return;
        }
        this.cards.push(card);
        this.savelocal();
    }

    //deleting current card
    delete() {
        const filtered = this.getfilter();
        if (filtered.length === 0) return; //no cards to delete

        const currentCard = this.getcurrent();
        const index = this.cards.indexOf(currentCard);

        this.cards.splice(index, 1); //deletes card from array

        this.currentIndex = 0; //reset index 
        this.savelocal(); //always save after changes
    }

    //navigate to next card
    next() {
        if (this.getfilter().length === 0) return; //no cards to navigate
        this.currentIndex ++

        if (this.currentIndex >= this.getfilter().length) {
            this.currentIndex = 0; //wrap around to first card
        }
        this.showAnswer = false; //reset to question view when navigating

        //if reached the last card, go reset to the first card and show questions always when navigating
    }

    //going to previous card
    previous() {
        if (this.getfilter().length === 0) return; //no cards to navigate
        this.currentIndex --;
        
        if (this.currentIndex < 0) {
            this.currentIndex = this.getfilter().length - 1; //wrap around to last card
        }
        this.showAnswer = false; //reset to question view when navigating
    }

    //flipping card
    flip() {
        this.showAnswer = !this.showAnswer; //toggle between question and answer
    }

    //setting difficulty of current card
    setdifficulty(level) {
        const currentCard = this.getcurrent();
        if (!currentCard) return; //no card to set difficulty for

        currentCard.difficulty = level; //update difficulty
        this.savelocal(); //save changes
    }

    //change subject filter
    changeSubject(subject) {
        this.currentSub = subject;
        this.currentIndex = 0; //reset index when changing subject
        this.showAnswer = false; //reset to question view when changing subject
    }
}; 

const deck = new Deck();
deck.loadDefaultCards(); //load default cards if none exist

//CANVAS LOGIC to draw the flashcard
function drawCard() {
    const card = deck.getcurrent();


    //clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //if no cards, show message
    if (!card) {
        ctx.font = "20px Arial";
        ctx.fillText("No cards in this subject!", 50, 100);
        return;
    }

    //difficulty border colors
    let borderColor = "green"; //default for easy
    if (card.difficulty === "medium") borderColor = "orange";
    else if (card.difficulty === "hard") borderColor = "red";

    //draw flashcard rectangle
    ctx.fillStyle = "white";
    ctx.fillRect(20, 20, 360, 200);

    //draw border 
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 360, 200);

    //setting text properties
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";

    //display question or answer based on flip state
    const text = deck.showAnswer ? card.answer : card.question;
    ctx.fillText(text, 200, 120); //centered in the card

}

//identifying DOM elements
const qInput = document.getElementById("question");
const aInput = document.getElementById("answer");
const subjectSelect = document.getElementById("subject-select"); 

//event listeners for buttons
document.getElementById("add-button").addEventListener("click", () => {
    const question = qInput.value;
    const answer = aInput.value;
    const subject = subjectSelect.value;

    if (!question || !answer) {
        alert("Please enter both question and answer!");
        return;
    }

    //making a new card object and adding it to the deck
    const newCard = new Flashcard(question, answer, subject);
    deck.add(newCard);

    //clear input fields after adding
    qInput.value = "";
    aInput.value = "";

    drawCard(); //redraw card to show new addition

});

//delete the card when delete button is clicked
document.getElementById("delete-button").addEventListener("click", () => {
    deck.delete();
    drawCard(); //redraw card after deletion
});

//navigate to next card
document.getElementById("next").addEventListener("click", () => {
    deck.next();
    drawCard(); //redraw card after navigating
});

//navigate to previous card
document.getElementById("back").addEventListener("click", () => {
    deck.previous();
    drawCard(); //redraw card after navigating
});

//flip card 
document.getElementById("flip").addEventListener("click", () => {
    deck.flip();
    drawCard(); //redraw card after flipping
});

//change subject filter
subjectSelect.addEventListener("change", () => {   
    deck.changeSubject(subjectSelect.value);    
    drawCard(); //redraw card after changing subject
});

document.getElementById("easy").addEventListener("click", () => {
    deck.setdifficulty("easy");
    drawCard(); //redraw card after setting difficulty
});

document.getElementById("medium").addEventListener("click", () => {
    deck.setdifficulty("medium");
    drawCard(); //redraw card after setting difficulty
});

document.getElementById("hard").addEventListener("click", () => {
    deck.setdifficulty("hard");
    drawCard(); //redraw card after setting difficulty
}); 


drawCard(); //initial draw of the card
