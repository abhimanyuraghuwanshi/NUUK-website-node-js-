fetch('api.json').then(res=> res.json())
.then((data)=> {

// sumit without refresh
var form = document.getElementById("sub");
form.setAttribute("onsubmit", "return false");

// score board
var scoreboard = document.createElement("div");
scoreboard.setAttribute("id", "board");
scoreboard.innerHTML = "<h3>Scoreboard</h3>"
document.getElementById("sub").appendChild(scoreboard);


for (var i = 0; i < 5; i++) {

    var ques = document.createElement("div");
    ques.setAttribute("id", `div${data[i].id}`)
    ques.innerHTML = "Q" + data[i].id + "." + data[i].question;
    document.getElementById("sub").appendChild(ques);

    // options div
    var opt = document.createElement("div");
    opt.setAttribute("id", `option${data[i].id}`);
    document.getElementById("sub").appendChild(opt);

    for (let j = 0; j < 4; j++) {
        // option1
        var para = document.createElement("p");
        para.innerHTML = data[i].options[j];
        para.setAttribute("id", `para${data[i].options[j]}`)
        document.getElementById(`option${data[i].id}`).appendChild(para);


        var btn = document.createElement("input");
        btn.setAttribute("type", "radio");
        btn.setAttribute("name", `option${data[i].id}`);
        btn.setAttribute("id", data[i].options[j])
        document.getElementById(`para${data[i].options[j]}`).prepend(btn);
    }
    // break line
    var hr = document.createElement("hr");
    document.getElementById(`para${data[i].options[3]}`).appendChild(hr)

};

// submit button
var submit = document.createElement("button");
submit.setAttribute("type", "submit");
submit.setAttribute("id", "submitbtn");
submit.innerHTML = "Submit";
document.getElementById("sub").appendChild(submit);
// reset button
var reset = document.createElement("button");
reset.setAttribute("type", "reset");
reset.setAttribute("id", "reset");
reset.innerHTML = "Startover";
document.getElementById("sub").appendChild(reset);




// score calculate
var click = document.getElementById("submitbtn");
click.addEventListener("click", () => {
    let mark = 0, neg = 0;
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 4; i++) {
            let a = document.getElementById(data[j].options[i]).checked
            if (a == true) {
                let temp = ++i;
                if (temp == data[j].answer) {
                    mark++;
                } else {
                    neg++;
                }
            }
        }
    }

    console.log(mark);
    console.log(neg);

    document.getElementById("board").innerHTML = "<h3>ScoreBoard </h3><br>Score: " + mark + " / 5<br>wrong ans: " + neg;

    document.getElementById("reset").click();
})
});