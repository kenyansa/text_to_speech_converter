let utterance = new SpeechSynthesisUtterance(); // create SpeechSynthesisUtterance object

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
let isPaused = false;
document.querySelector("button").addEventListener("click", ()=>{
    if(!isPaused){
        //set the text
        utterance.text = document.querySelector("textarea").value;
        speechSynthesis.speak(utterance);
    }else{
        if(speechSynthesis.paused){
            speechSynthesis.resume();
            isPaused = false;
        }else {
            speechSynthesis.pause();
            isPaused = true;
        }
    }
    
});