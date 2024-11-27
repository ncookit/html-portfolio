/***********************************
 * Name: cookit
 * Description: math flash cards game. 
 *              Contains multiple operators and different levels of difficulty.
 */


//select random number from 1 to max
function getRandomInt(max){
    return Math.floor(Math.random() * max + 1);
}

//used by btn_start and btn_go to update question
function start(){
    var num1;
    var num2;
    var op1;
    var ops=""; //holds operators. Add below.
    var max = 3; //each level is extended by 3 numbers
    var neg = [-1,1];
    var neg1 = 1; //default index
    var neg2 = 1; //default index

    var box = "";

    var level = document.getElementById("level").value; //level choice

    //generate two random numbers within the level range
    num1 = getRandomInt(level * max);
    num2 = getRandomInt(level * max);

    //check for Negative numbers. 50% chance each number is negative
    box = document.getElementById("negbox").checked;  //boolean
    if (box == true){
        index = Math.floor(Math.random() * neg.length);
        neg1 = neg1*neg[index];
        index = Math.floor(Math.random() * neg.length);
        neg2 = neg2*neg[index];
    }
    //check for Addition as operator. Add it if selected
    box = document.getElementById("addbox").checked; //boolean
    if (box == true){
        ops+="+";
    }
    //check for Subtraction as operator. Add it if selected
    box = document.getElementById("subbox").checked; //boolean
    if (box == true){
        ops+="-";
    }    
    //check for Multiplication as operator. Add it if selected.
    box = document.getElementById("multbox").checked; //boolean
    if (box == true){
        ops+="x";
    }
    //check for Division as operator. Add it if selected.
    box = document.getElementById("divbox").checked; //boolean
    if (box == true){
        ops+="/";
        //document.getElementById("debug").innerHTML=ops;
    }

    //choose operator
    op1 = ops.charAt(Math.floor(Math.random() * ops.length));

    //when the operator is division, show product and one number
    if (op1 == '/'){
        let t = num1;
        num1 *= num2;
        num2 = t;
    }

    //show question on screen
    document.getElementById("num1").innerHTML=num1*neg1;
    document.getElementById("num2").innerHTML=num2*neg2;
    document.getElementById("op1").innerHTML=op1;

    //document.getElementById("debug").innerHTML="good";
}

// This function
function btn_start(form) {

    //set scores to zero
    document.getElementById("lastAnswer").innerHTML="None";
    document.getElementById("correct").innerHTML=0;
    document.getElementById("incorrect").innerHTML=0;
    document.getElementById("total").innerHTML=0;
    document.getElementById("lastAnswerpic").src="./images/img_start.png";

    //empty log
    document.getElementById("log").innerHTML = "";

    //update question if operation selected
    if (!atLeastOneCheckboxIsChecked()){
        alert("Please check an operation");
    } else {
        start();
    }
    

    //clear out user answer
    document.getElementById("ans").value="";
    document.getElementById("ans").focus();

    //debug messages
    //document.getElementById("debug").innerHTML=neg2;
    //console.log(test);

}//end btn_start()


/*
*  parse through mandatory checkboxes (class=="ops")
*  returns True if at least one checked, False otherwise
*/
function atLeastOneCheckboxIsChecked(){
    const checkboxes = Array.from(document.querySelectorAll(".ops"));
    return checkboxes.reduce((acc, curr) => acc || curr.checked, false);
}


/*
*  when user clicks "Go!", check their answer against the provided question
*   and update screen counters
*   
*   get input from Entry
    update "Last Answer" and scores on Labels
    clear input from Entry
    update math question on Labels based on Level
*/
function btn_go(form){
    var num1 = parseFloat(document.getElementById("num1").innerHTML);
    var num2 = parseFloat(document.getElementById("num2").innerHTML);
    var op1 = document.getElementById("op1").innerHTML;
    var ans = parseFloat(document.getElementById("ans").value); //user answer
    var answer = 0; //hold correct answer

    //only update if entry box has valid numbers
    if (isNaN(num1)){
        alert("Please press START");

    } else if (!atLeastOneCheckboxIsChecked()){
        alert("Please check an operation");


    } else if (isNaN(ans) == false){
        //determine correct answer
        if (op1 == "+"){
            answer = num1 + num2;
        }else if (op1 == "-"){
            answer = num1 - num2;
        }else if (op1 == "x"){
            answer = num1 * num2;
        }else { //op1 == "/"
            answer = num1 / num2;
        }

        //compare user answer with correct
        let t=0;
        if (ans == answer){
            document.getElementById("lastAnswer").innerHTML="Correct!";
            t=parseFloat(document.getElementById("correct").innerHTML);
            document.getElementById("correct").innerHTML=t+1;
            t=parseFloat(document.getElementById("total").innerHTML);
            document.getElementById("total").innerHTML=t+1;
            document.getElementById("lastAnswerpic").src="./images/img_correct.png";
        } else { //must be incorrect
            document.getElementById("lastAnswer").innerHTML="Incorrect!";
            t=parseFloat(document.getElementById("incorrect").innerHTML);
            document.getElementById("incorrect").innerHTML=t+1;
            t=parseFloat(document.getElementById("total").innerHTML);
            document.getElementById("total").innerHTML=t+1;
            document.getElementById("lastAnswerpic").src="./images/img_incorrect.png";
        }

        //update question
        start();

        //stuff for log
        let msg = num1.toString() + op1.toString() + num2.toString() + '=' + ans;
        msg+='&emsp; &emsp;' + document.getElementById("lastAnswer").value;

        //show correct answer if incorrect
        if (ans != answer){
            msg+='&emsp; &emsp;' + 'Answer='+answer;
        }

        let log_prev = "";
        log_prev = document.getElementById("log").innerHTML;

        //display recent question on top of log. '\r\n' for newline in html element
        document.getElementById("log").innerHTML = msg + "\r\n" + log_prev;



        //document.getElementById("debug").innerHTML=msg;


        //empty entry box for new answer
        document.getElementById("ans").value="";
        //focus back to entry box
        document.getElementById("ans").focus();



    } else {
        //provide alert to user regarding bad input
        alert("Please enter a valid number");

        //empty entry box for new answer
        document.getElementById("ans").value="";
        //focus back to entry box
        document.getElementById("ans").focus();
        
    }//end if isNAN()


    //debug messages
    //document.getElementById("debug").innerHTML=ans;
    //console.log(test);
}//end btn_go()