const btn = document.querySelector('.talk')
const content = document.querySelector('.content')

// Fungsi untuk berbicara menggunakan SpeechSynthesis
function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    // Mengatur pengaturan suara
    text_speak.rate = 1; // Sedikit lebih lambat
    text_speak.volume = 1;
    text_speak.pitch = 1; // Sedikit lebih tinggi

    // Mencari dan memilih suara yang mirip dengan JARVIS
    const voices = window.speechSynthesis.getVoices();
    const jarvisVoice = voices.find(voice => voice.name.includes('Google UK English Male') || voice.name.includes('Daniel'));
    if (jarvisVoice) {
        text_speak.voice = jarvisVoice;
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour >= 0 && hour < 12){
        speak("Good Morning Boss...");
    } else if(hour >= 12 && hour < 17){
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', ()=>{
    window.speechSynthesis.onvoiceschanged = () => {
        speak("Initializing JARVIS...");
        wishMe();
    };
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...";
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hai') || message.includes('halo')){
        speak("Halo tuan, apakah ada yang bisa kami bantu?");
    } else if(message.includes("buka google")){
        window.open("https://google.com", "_blank");
        speak("Membuka Google...");
    } else if(message.includes("buka youtube") || message.includes("buka yt")){
        window.open("https://youtube.com", "_blank");
        speak("Membuka Youtube...");
    } else if(message.includes("buka ig") || message.includes("buka instagram")){
        window.open("https://www.instagram.com/", "_blank");
        speak("Membuka Instagram...");
    } else if(message.includes('tolong carikan saya')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Ini hasil pencarian yang kami temui " + message;
        speak(finalText);
    } else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "Ini adalah website untuk mencari sesuatu yang kamu minta " + message;
        speak(finalText);
    } else if(message.includes('jam berapa sekarang')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
        const finalText = time;
        speak(finalText);
    } else if(message.includes('tanggal berapa sekarang')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"});
        const finalText = date;
        speak(finalText);
    } else if(message.includes('kalkulator')) {
        window.open('Calculator:///');
        const finalText = "Membuka kalkulator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Ini adalah hasil pencarian yang kami temui " + message + " di Google";
        speak(finalText);
    }
}
