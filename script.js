let utterance = new SpeechSynthesisUtterance(); // create SpeechSynthesisUtterance object
let isPaused = false;

let voices = [];
let voiceSelect = document.querySelector("select")
const textarea = document.querySelector("textarea");

//local the saved text from local storage
const savedText = localStorage.getItem("savedText");
if(savedText){
    textarea.value = savedText;
}

speechSynthesis.onvoiceschanged = ()=>{
    voices = speechSynthesis.getVoices();
    speechSynthesis.voice = voices[0]; //default choice for the voice (first voice)

    voices.forEach((voice, i)=>(voiceSelect.options[i] = new Option(voice.name, i) ));
}
//add change event to the dropdown select
voiceSelect.addEventListener("change", ()=>{
    utterance.voice = voices[voiceSelect.value];
})

//button click event to convert text to speech or pause/resume
const button = document.querySelector("button");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");

button.addEventListener("click", ()=>{
    if (!isPaused){
        if (speechSynthesis.speaking){
            //pause the speech
            speechSynthesis.pause();
            isPaused = true;
            playIcon.style.display = "inline";
            pauseIcon.style.display = "none";
        }else {
            //set the text
            utterance.text = textarea.value;
            //set the rate and pitch
            utterance.rate = parseFloat(document.getElementById("rate").value);
            utterance.pitch = parseFloat(document.getElementById("pitch").value);
            speechSynthesis.speak(utterance);
            playIcon.style.display = "none";
            pauseIcon.style.display = "inline";
        }
    }else {
        //resume the speech
        speechSynthesis.resume();
        isPaused = false;
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline";
    }
});

//save the text in the textarea to local storage
textarea.addEventListener("input", ()=>{
    localStorage.setItem("savedText", textarea.value);
})

// document.querySelector("button").addEventListener("click", ()=>{
//     if(!isPaused){
//         //set the text
//         utterance.text = document.querySelector("textarea").value;
//         speechSynthesis.speak(utterance);
//     }else{
//         if(speechSynthesis.paused){
//             speechSynthesis.resume();
//             isPaused = false;
//         }else {
//             speechSynthesis.pause();
//             isPaused = true;
//         }
//     }
    
// });