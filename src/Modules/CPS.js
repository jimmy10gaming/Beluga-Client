export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
     // Function to display player's experience dynamically with enhanced styling
function displayPlayerExperience() {
    const playerExperience = ModAPI.player.experienceTotal; // Get player's total experience

    // Create a new div element for the text
    const experienceText = document.createElement("div");
    experienceText.textContent = `Player's Total Experience: ${playerExperience}`; // Set the text content

    // Apply styling for enhanced display
    experienceText.style.color = "green"; // Set green text color for experience
    experienceText.style.position = "absolute"; // Set position on the screen
    experienceText.style.top = "50%"; // Center vertically
    experienceText.style.left = "50%"; // Center horizontally
    experienceText.style.transform = "translate(-50%, -50%)"; // Center the element precisely
    experienceText.style.fontSize = "4em"; // Set a larger font size
    experienceText.style.backgroundColor = "black"; // Set black background color
    experienceText.style.color = "white"; // Set white text color

    // Check if the previous text element exists and remove it before adding the new one
    const previousExperienceText = document.getElementById("playerExperience");
    if (previousExperienceText) {
        previousExperienceText.remove();
    }

    experienceText.id = "playerExperience"; // Set an ID for the text element
    document.body.appendChild(experienceText); // Add the text element to the document body
}
    } else {
          // Function to delete the player's experience display
    function deletePlayerExperienceDisplay() {
        const experienceDisplay = document.getElementById("playerExperience");
        if (experienceDisplay) {
            experienceDisplay.remove();
        }
    }

    // Call the function to delete the player's experience display
    deletePlayerExperienceDisplay(); 
    }
}