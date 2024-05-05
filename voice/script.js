let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Clear the select element
    
    // Populate the select element with voice options
    voices.forEach((voice, i) => {
        let option = new Option(voice.name, voice.voiceURI);
        voiceSelect.appendChild(option);
    });

    // Set the speech voice to the first voice in the list as a default
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Event listener for voice changes
voiceSelect.addEventListener("change", () => {
    const selectedVoiceURI = voiceSelect.value;
    // Find the voice with the selected URI
    const selectedVoice = voices.find(voice => voice.voiceURI === selectedVoiceURI);
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }
});

// Event listener for button click
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

// Event listener for when the list of available voices changes
window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceList();
};

// Populate the voice list when the script is loaded
populateVoiceList();
