# Custom Tournament Bracket Builder
**WEB-115 Final Project Proposal**
Student: Eva Pathak | Repo: WEB-115_FinalProject_Pathak

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
| **If Statements & Loops** | Generating the bracket requires looping over contestants to pair them into first-round matches. If statements determine whether a round is complete (all winners chosen) before unlocking the next round, and check edge cases like odd contestant counts or a bye slot. |
| **Event Listeners** | Click listeners on each match card select the winner and trigger a re-render. A submit listener on the setup form kicks off bracket generation. A reset button clears state after a confirmation check. |
| **DOM Element Creation** | The entire bracket (every round column, match card, contestant name label, and winner indicator) is built dynamically with `createElement` and `appendChild`. Nothing is hardcoded in the HTML beyond the app shell. |
| **Classes & Subclasses** | A base `Tournament` class holds the contestant list, bracket state, and methods like `generateBracket()` and `recordWinner()`. `SingleEliminationTournament` extends `Tournament` and implements the specific bracket-advancement logic. A `Match` class represents each individual pairing with properties for both contestants and the winner. |

---

## DLC — Additional Topics

### HTML Canvas
The bracket is rendered visually on an HTML `<canvas>` element. Contestants are drawn as labeled boxes, connecting lines show the bracket structure, and completed matches are styled differently from pending ones. Canvas re-renders after every winner selection to reflect the updated state.

---

## Tech Stack

- HTML, CSS, Vanilla JavaScript
- `localStorage` for tournament persistence
- HTML Canvas for bracket rendering
- VS Code + GitHub
