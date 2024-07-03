// Define color elements
const red = document.getElementById("red");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");

// Array of color elements
const colors = [red, green, yellow, blue];

// Game state variables
let sequence = [];
let playerSeq = [];
let level = 1; // Starting level

// Function to generate a random color and add to sequence
const generateColor = () => {
    document.getElementById("black").textContent = `${level} Level`;
    const randomNum = Math.floor(Math.random() * colors.length);
    const color = colors[randomNum];
        
    sequence.push(color);
    blink(sequence);
    playerSeq = [];
    level++; // Increment level after generating color
};

// Function to handle player turn
const playerTurn = (color) => {
    color.style.opacity = 0.3;
    setTimeout(() => {
        color.style.opacity = 1;
    }, 300);
    playerSeq.push(color);

    // Check if player's sequence length matches generated sequence length
    if (playerSeq.length === sequence.length) {
        if (!checkSequence()) {
            alert("Game Over");
            resetGame(); // Reset game on game over
        } else {
            setTimeout(generateColor, 1000); // Start a new round after a delay
        }
    }
};

// Function to check player's sequence against generated sequence
const checkSequence = () => {
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== playerSeq[i]) {
            return false; // Incorrect sequence
        }
    }
    return true; // Correct sequence
};

// Function to animate blinking of sequence
const blink = (sequence) => {
    document.body.style.cursor = "wait";
    sequence.forEach((color, i) => {
        const blinkDuration = 500; // duration of the blink in milliseconds
        const interval = 1500; // interval between each blink in milliseconds
    
        setTimeout(() => {
            color.style.opacity = 0.1;
        }, i * interval);
    
        setTimeout(() => {
            color.style.opacity = 1;
        }, i * interval + blinkDuration);
    });
    
    const totalDuration = sequence.length * 1500 + 500; // Last blink's total time
    
    setTimeout(() => {
        document.body.style.cursor = "default";
    }, totalDuration);
};

// Function to reset the game state
const resetGame = () => {
    sequence = [];
    playerSeq = [];
    level = 1;
    generateColor(); // Start a new game
};

// Add event listeners to color buttons
red.addEventListener("click", () => playerTurn(red));
green.addEventListener("click", () => playerTurn(green));
yellow.addEventListener("click", () => playerTurn(yellow));
blue.addEventListener("click", () => playerTurn(blue));

// Start the game
// generateColor();


document.getElementById("btn").addEventListener("click", function(){
    generateColor();
    document.getElementById("btn").disabled="true";
})