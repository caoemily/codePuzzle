let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value=='' || attempt.value==''){
        setHiddenFields();
    }
    if(!validateInput(input.value)){
        return false;
    }
    else{
        attempt.value++;
    }
    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReply();
    }
    else if (attempt.value>=10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReply();
    }
    else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    answer.value = (Math.floor(Math.random()*10000)).toString();
    while(answer.value.length<4){
        answer.value = "0"+answer.value;
    }
    attempt.value=0;    
}

function setMessage(amessage) {
    document.getElementById("message").innerHTML = amessage;
}

function validateInput(ainput) {
    if(ainput.length===4){
        return true;
    }
    else{
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input) {
    var correct=0;
    var html= '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(var i=0; i<input.length; i++){
        if(input.charAt(i)===answer.value.charAt(i)){
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        }
        else if(answer.value.indexOf(input.charAt(i))>-1) {
            html+='<span class="glyphicon glyphicon-transfer"></span>';
        }
        else{
            html+='<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';
    document.getElementById("results").innerHTML += html;
    if(correct===input.length){
        return true;
    }
    else{
        return false;
    }
}

function showAnswer (success) {
    var code = document.getElementById("code");
    if(success){
        code.className += " success";
    }
    else {
        code.className += " failure";
    }
    code.innerHTML = answer.value;
}

function showReply () {
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}
