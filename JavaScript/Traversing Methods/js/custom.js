
// var output = document.getElementById('answer1').parentElement;
// var output = document.getElementById('html').parentElement;
// var output = document.getElementById('html').parentNode;

// var output = document.getElementById('main').childNodes;
// var output = document.getElementById('main').children;
// var output = document.getElementById('main').firstElementChild;
// var output = document.getElementById('main').lastElementChild;
// var output = document.getElementById('answer1').hasChildNodes();

// var output = document.getElementById('question_answer2').previousElementSibling;

// var output = document.documentElement;

// var output = document.body;
// console.log(output);



var allQuestionAnswer = document.querySelectorAll('.question');

allQuestionAnswer.forEach((v,i) => {
    v.addEventListener('click', (event) => {
        // console.log(event.target);
        event.target.nextElementSibling.classList.toggle('d-none');

        if(event.target.children[0].innerText == '-'){
            event.target.children[0].innerText = '+';
        } else {
            event.target.children[0].innerText = '-';
        }

        allQuestionAnswer.forEach((value,index) => {
            
            if(i != index){
                value.nextElementSibling.classList.add('d-none');
                value.children[0].innerText = '+';
            }

        });
    })
})