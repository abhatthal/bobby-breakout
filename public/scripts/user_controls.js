document.addEventListener('keyDown', keyDownHandler, false)
document.addEventListener('keyUp', keyUpHandler, false)

var moveLeft = false
var moveRight = false
var moveUp = false
var moveDown = false
var interactDown = false
var pauseGame = false

// Handles keys being pressed down
function keyDownHandler(event) {
    // Down arrow or S for moving sprite down 
    if (event.keyCode == 40 || event.keyCode == 83) {
        moveDown = true
    }
    // Left arrow or A for moving sprite left
    else if (event.keyCode == 37 || event.keyCode == 65) {
        moveLeft = true
    }
    // Right arrow or D to move sprite right
    else if (event.keyCode == 39 || event.keyCode == 68) {
        moveRight = true
    }
    // Up arrow or W to move sprite up
    else if (event.keyCode == 38 || event.keyCode == 87) {
        moveUp = true
    }
    // Space or E for interaction 
    else if (event.keyCode == 32 || event.keyCode == 69) {
        interactionDown = true
    }
    // Escape or P for pausing (to menu)
    else if (event.keyCode == 27 || event.keyCode == 80) {
        pauseGame = !pauseGame
    }
}

// Handles keys being released
function keyUpHandler(event) {
    // Down arrow or S for moving sprite down 
    if (event.keyCode == 40 || event.keyCode == 83) {
        moveDown = false
    }
    // Left arrow or A for moving sprite left
    else if (event.keyCode == 37 || event.keyCode == 65) {
        moveLeft = false
    }
    // Right arrow or D to move sprite right
    else if (event.keyCode == 39 || event.keyCode == 68) {
        moveRight = false
    }
    // Up arrow or W to move sprite up
    else if (event.keyCode == 38 || event.keyCode == 87) {
        moveUp = false
    }
    // Space or E for interaction 
    else if (event.keyCode == 32 || event.keyCode == 69) {
        interactionDown = false
    }
}