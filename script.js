let utterance = new SpeechSynthesisUtterance(); // create SpeechSynthesisUtterance object

let voices = [];
let voiceSelect = document.querySelector("select")

speechSynthesis.onvoiceschanged = ()=>{
    voices = speechSynthesis.getVoices();
    speechSynthesis.voice = voices[0]; //default choice for the voice (first voice)

    voices.forEach((voice, i)=>(voiceSelect.options[i] = new Option(voice.name, i) ));
}

voiceSelect.addEventListener("change", ()=>{
    utterance.voice = voices[voiceSelect.value];
})
document.querySelector("button").addEventListener("click", ()=>{
    // Set the text and language
    utterance.text = document.querySelector("textarea").value;
    speechSynthesis.speak(utterance);
})