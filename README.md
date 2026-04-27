# Custom Flashcard Set
**WEB-115 Final Project Proposal**
Student: Eva Pathak | Repo: `WEB-115_FinalProject_Pathak`

---

## Overview

This is a web app that lets users practice basic skills learned in class to prepare for quizzes, tests, exams, and maybe even just for fun! The user can find a topic to study for from a list of a few core subjects (AP Lang, AP PreCalc, APUSH, and AP Physics) for a typical high school junior. The user can add in any flashcard they think isn't covered in the web app. There will be buttons to click next and flip the card with no background distractions for a focused study session. The flashcards will be stored to a `localStorage` so progress is not lost.

---

## Features

- Create a new flashcard for a specific subject and save it
- All flashcards pick up where you left off and is saved to `localStorage`
- Users can delete any flashcards made manually
- Users can categorize flashcards based on difficulty (hard, medium, easy)
  - Thinking that this can be implemented by a user responding to a window alert after clicking the "add difficulty" button.
  - Then, the user can add a difficulty (hard, medium, easy) and the corresponding color will outline that singular flashcard

---

## Core Requirements Coverage

| Requirement | Implementation |
|---|---|
| **If Statements & Loops** | Loops can primarily be used generate flashcards from the certain array for that specific subject. This iteration will help with click, next, and flip. If statements can be used for checking if the user entered a flashcard that is already a part of the pre-made set.|
| **Event Listeners** | Event Listeners for basically every button that will be visible and for flashcards to move dynamically. Event Listeners will also listen for card difficulty changes as well flashcard saves in the web app. |
| **DOM Element Creation** | The entire bracket (every round column, match card, contestant name label, and winner indicator) is built dynamically with `createElement` and `appendChild`. Nothing is hardcoded in the HTML beyond the app shell. |
| **Classes & Subclasses** | A base `flashcard` class holds the about 4 arrays (arrays of arrays maybe) worth of content with methods like `checkAnswer`. `Deck` takes the flashcards and handles everything surrounding shuffling and current progress.|

---

## DLC — Additional Topic

### HTML Canvas
HTML Canvas will be utilized to display the flashcards in a rounded rectangle shape for a softer look using the `<canvas>` element. The difficulty color will be changed and shown on the homepage of the web app. 

---

## Tech Stack

- HTML, CSS, Vanilla JavaScript
- `localStorage` for tournament persistence
- HTML Canvas for bracket rendering
- VS Code + GitHub
