const container = document.getElementById("glossaryContainer");
const searchBar = document.getElementById("searchBar");

function displayTerms(data){

container.innerHTML="";

data.forEach(item=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<h3>${item.icon} ${item.term}</h3>
<p>${item.definition}</p>
<a href="${item.resource}" target="_blank">Learn More</a>
`;

container.appendChild(card);

});

}

displayTerms(glossary);

searchBar.addEventListener("input",function(){

const value=this.value.toLowerCase();

const filtered=glossary.filter(item =>
item.term.toLowerCase().includes(value)
);

displayTerms(filtered);

});

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

const aiKnowledge = {

docker:"Docker is a container platform that packages applications with their dependencies.",

kubernetes:"Kubernetes manages and scales containerized applications automatically.",

jenkins:"Jenkins is a CI/CD automation tool used for building and deploying applications.",

devops:"DevOps is a culture that integrates development and operations for faster delivery.",

terraform:"Terraform is an Infrastructure as Code tool used to provision cloud infrastructure.",

git:"Git is a distributed version control system used to track code changes."

};

function askAI(){

const input = document.getElementById("userInput").value.toLowerCase();
const chatbox = document.getElementById("chatbox");

chatbox.innerHTML += `<div class="user">You: ${input}</div>`;

let response = "Sorry, I don't know that yet.";

for(let key in aiKnowledge){

if(input.includes(key)){
response = aiKnowledge[key];
}

}

chatbox.innerHTML += `<div class="bot">AI: ${response}</div>`;

document.getElementById("userInput").value="";
}
document.getElementById("userInput").addEventListener("keypress",function(event){

if(event.key==="Enter"){
askAI();
}

});

const quiz = [

{
question:"What does CI/CD stand for?",
options:["Continuous Integration and Continuous Deployment","Code Integration and Code Deployment","Centralized Integration","Continuous Infrastructure"],
answer:0
},

{
question:"Which tool is used for containerization?",
options:["Docker","Terraform","Git","Prometheus"],
answer:0
},

{
question:"Which tool is used for container orchestration?",
options:["Docker","Kubernetes","Git","Ansible"],
answer:1
},

{
question:"Which tool is used for version control?",
options:["Git","Docker","Jenkins","Terraform"],
answer:0
},

{
question:"Which tool is used for Infrastructure as Code?",
options:["Terraform","Git","Jenkins","Prometheus"],
answer:0
}

];

let currentQuestion = 0;
let score = 0;

function loadQuestion(){

const q = quiz[currentQuestion];

document.getElementById("question").innerText = q.question;

const optionsDiv = document.getElementById("options");
optionsDiv.innerHTML="";

q.options.forEach((option,index)=>{

const btn = document.createElement("div");
btn.className="option";
btn.innerText=option;

btn.onclick = () => checkAnswer(index);

optionsDiv.appendChild(btn);

});

}

function checkAnswer(selected){

if(selected === quiz[currentQuestion].answer){
score++;
}

}

function nextQuestion(){

currentQuestion++;

if(currentQuestion < quiz.length){

loadQuestion();

}else{

document.getElementById("question").innerText="Quiz Finished!";
document.getElementById("options").innerHTML="";
document.getElementById("score").innerText="Your Score: "+score+"/"+quiz.length;

}

}

loadQuestion();