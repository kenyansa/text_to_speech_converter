let utterance = new SpeechSynthesisUtterance(); // create SpeechSynthesisUtterance object
let isPaused = false;

let voices = [];
let voiceSelect = document.querySelector("select")

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
const textarea = document.querySelector("textarea");

button.addEventListener("click", ()=>{
    if (!isPaused){
        if (speechSynthesis.speaking){
            //pause the speech
            speechSynthesis.pause();
            isPaused = true;
            button.textContent = "Resume";
        }else {
            //set the text
            utterance.text = textarea.value;
            speechSynthesis.speak(utterance);
            button.textContent = "Pause";
        }
    }else {
        //resume the speech
        speechSynthesis.resume();
        isPaused = false;
        button.textContent = "Pause";
    }
});

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