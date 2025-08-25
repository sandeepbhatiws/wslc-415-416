
// var output = document.getElementById('row1')
// // console.log(output.innerText)
// // console.log(output.innerHTML)
// document.getElementById('output').innerHTML = output.innerHTML;


// var output = document.getElementsByClassName('row1');
// console.log(output[2].innerText);
// document.getElementById('output').innerHTML = output[2].innerText;


// var output = document.getElementsByTagName('div');
// console.log(output[1].innerText);

// var output = document.querySelector('#row1');
// var output = document.querySelector('.row1');
// var output = document.querySelector('div');
// console.log(output.innerText);

var output = document.querySelectorAll('#row1');
var output = document.querySelectorAll('.row1');

// console.log(output[0].innerText);
// console.log(output[1].innerText);
// console.log(output[2].innerText);

// output.forEach((value, index) => {
//     console.log(index);
//     console.log(value.innerText);
// } );


// var output  = document.getElementById('name');
// console.log(output.value);
// document.getElementById('name').value = 'Welcome to WsCube Tech';

var output =  document.getElementById('image');
console.log(output.src);
document.getElementById('image').src = 'images/2.jpg';



document.getElementById('row2').style.backgroundColor = 'red';
document.getElementById('row2').style.color = 'white';