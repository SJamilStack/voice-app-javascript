const greeting_questions = [
  "How are you",
  "How do you do",
  "How are you doing",
];
const greeting_replies = [
  "I am doing okay",
  "Why do you care",
  "Thanks for asking, but I will not answer you",
];






// ------------Read Aloud------------------

var speechTimeout;
function speechTimer() {
  window.speechSynthesis.pause();
  window.speechSynthesis.resume();
  speechTimeout = setTimeout(speechTimer, 10000);
}

const read_btn = document.getElementById("read-btn");
const textarea = document.getElementById("text-to-read");

function readAloud() {
  const text_to_read = textarea.value;
  if(text_to_read.length == 0) {
    console.log("Please put some text for me to read!")
  } else {
    
    window.speechSynthesis.cancel();
    speechTimeout = setTimeout(speechTimer, 10000);
    const speak = new SpeechSynthesisUtterance();
    speak.text = text_to_read;
    speak.volume = 1;
    speak.pitch = 1;
    speak.rate = 1;
    window.speechSynthesis.speak(speak);
  }
}

// ---------------- Repeat Back -------------

const repeat_btn = document.getElementById("repeat-btn");
const status_p = document.getElementById("status");
const content = document.querySelector(".content");



const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

repeat_btn.addEventListener("click", () => {
  const repeat_recognition = new SpeechRecognition();
  repeat_recognition.start();

  repeat_recognition.onstart = () => {
    console.log("Listening");
    status_p.style.display = "block";
    status_p.textContent = "Listening...";
  };

  repeat_recognition.onresult = (event) => {
    const current = event.resultIndex;
    const spokenText = event.results[current][0].transcript;
    content.textContent = spokenText;
    status_p.textContent = "Repeating..."
    repeat(spokenText.toLowerCase());
    status_p.textContent = "Repeat Complete."
    repeat_recognition.stop()
  };
});


function repeat(message) {
  window.speechSynthesis.cancel();
  const speak = new SpeechSynthesisUtterance();
  speak.text = message;
  speak.volume = 1;
  speak.pitch = 1;
  speak.rate = 1;
  window.speechSynthesis.speak(speak);
}


// --------- reply back ----------

const reply_btn = document.getElementById("reply-btn");
const chat_status = document.getElementById("chat-status");

reply_btn.addEventListener("click", () => {
  
  const recognition = new SpeechRecognition();
  recognition.start();

  recognition.onstart = () => {
    chat_status.style.display = "block";
    chat_status.textContent = "Listening..."
    
  }
  recognition.onresult = (event) => {
    const current = event.resultIndex;
    const spokenText = event.results[current][0].transcript;
    chat_status.textContent = "Replying..."
    reply(spokenText);
    recognition.stop();
    chat_status.textContent = "Click again to start over."
    
  };

})


function reply(message) {
  
  window.speechSynthesis.cancel();
  const speak = new SpeechSynthesisUtterance();

  if (greeting_questions.some((v) => message.includes(v.toLowerCase()))) {
    speak.text =
      greeting_replies[Math.floor(Math.random() * greeting_replies.length)];
  } else {
    speak.text = "I didn't understand what you said. But I am learning.";
  }
  speak.volume = 1;
  speak.pitch = 1;
  speak.rate = 1;
  window.speechSynthesis.speak(speak);

}









