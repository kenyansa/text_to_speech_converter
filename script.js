let utterance = new SpeechSynthesisUtterance(); // create SpeechSynthesisUtterance object
document.querySelector("button").addEventListener("click", ()=>{
    // Set the text and language
    utterance.text = document.querySelector("textarea").value;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
})

// Add the utterance to the speech synthesis queue
speechSynthesis.speak(utterance);