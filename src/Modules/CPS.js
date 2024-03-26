export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
      // Create a function to display player's experience dynamically
function displayPlayerExperience() {
    const playerExperience = ModAPI.player.experienceTotal; // Get player's total experience
    const experienceText = document.createElement("div"); // Create a new div element for the text
    experienceText.textContent = `Player's Total Experience: ${playerExperience}`; // Set the text content
    experienceText.style.color = "white"; // Set text color
    experienceText.style.position = "absolute"; // Set position on the screen
    experienceText.style.top = "10px"; // Adjust top position
    experienceText.style.left = "10px"; // Adjust left position

    // Check if the previous text element exists and remove it before adding the new one
    const previousExperienceText = document.getElementById("playerExperience");
    if (previousExperienceText) {
        previousExperienceText.remove();
    }

    experienceText.id = "playerExperience"; // Set an ID for the text element
    document.body.appendChild(experienceText); // Add the text element to the document body
}

// Call the function to display player's experience
displayPlayerExperience();

// Update player's experience every second using setInterval
setInterval(displayPlayerExperience, 1000);
    } else {
        function deletePlayerExperienceDisplay() {
            const experienceDisplay = document.getElementById("playerExperience");
            if (experienceDisplay) {
                experienceDisplay.remove();
            }
        }
    }
}