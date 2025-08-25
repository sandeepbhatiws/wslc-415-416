
// // localStorage.setItem('user_name', 'Raghav Mishra');

// // var name = localStorage.getItem('user_name');
// // console.log(name);

// localStorage.removeItem('user_name');





var states = [
    {id: 1, name: 'Maharashtra',country_name: 'India'},
    {id: 2, name: 'Karnataka',country_name: 'India'},
    {id: 3, name: 'Tamil Nadu',country_name: 'India'},
    {id: 4, name: 'West Bengal',country_name: 'India'},
    {id: 5, name: 'Gujarat',country_name: 'India'},
    {id: 6, name: 'Ontario',country_name: 'Canada'},
    {id: 7, name: 'Quebec',country_name: 'Canada'},
    {id: 8, name: 'British Columbia',country_name: 'Canada'},
    {id: 9, name: 'Alberta',country_name: 'Canada'},
    {id: 10, name: 'Manitoba',country_name: 'Canada'},
    {id: 11, name: 'New South Wales',country_name: 'Austraila'},
    {id: 12, name: 'Victoria',country_name: 'Austraila'},
    {id: 13, name: 'Queensland',country_name: 'Austraila'},
    {id: 14, name: 'Western Australia',country_name: 'Austraila'},
    {id: 15, name: 'South Australia',country_name: 'Austraila'}
];

document.getElementById('country').addEventListener('change', (event) => {
    // console.log(event.target.value);

    var filterStates = states.filter((v,i) => {
        if(v.country_name == event.target.value){
            return v;
        }
    })

    var showStates = '<option value="">Select State</option>';

    filterStates.forEach((v,i) => {
        showStates += '<option value="'+ v.name +'">'+ v.name +'</option>';
    })

    document.getElementById('state').innerHTML = showStates;
});

// var userInfos = [];

var userData = localStorage.getItem('userInfos');
if(userData){
    userInfos = JSON.parse(userData);
} else {
    userInfos = [];
}



// var userInfos = [
//     {
//         name : 'Rohan',
//         email : 'rohan@gmail.com',
//         mobile_number : 124567980,
//         country_name : 'India',
//         state_name : 'India' 
//     },
//     {
//         name : 'Ram',
//         email : 'ram@gmail.com',
//         mobile_number : 124567980,
//         country_name : 'India',
//         state_name : 'India' 
//     },
//     {
//         name : 'Sohan',
//         email : 'sohan@gmail.com',
//         mobile_number : 124567980,
//         country_name : 'India',
//         state_name : 'India' 
//     }
// ]

function displayUser(data){
    var userdata = '';

    if(data.length > 0){
        data.forEach((v,i) => {
            userdata += `<tr>
                    <td> ${ i+1 } </td>
                    <td> ${ v.name } </td>
                    <td>${ v.email }</td>
                    <td>${ v.mobile_number }</td>
                    <td>${ v.country_name }</td>
                    <td>${ v.state_name }</td>
                    <td><button onclick="deleteUser(${i})"> Delete </button></td>
                </tr>`;
        })
    } else {
        userdata += `<tr>
            <td colspan="7" >No Record Founds</td>
        </tr>`;
    }

    document.getElementById('fetch-data').innerHTML = userdata;
}

displayUser(userInfos);


function deleteUser(index){
    if(confirm('Are you sure you want to delete ?')){
        console.log(index);
        userInfos.splice(index,1);
        displayUser(userInfos);
    }
    
}


document.getElementById('formHandler').addEventListener('submit', (event) => {
    event.preventDefault();
    // var name = document.getElementById('name').value;
    // var email = event.target.email.value;

    var userData = {
        name : event.target.name.value,
        email : event.target.email.value,
        mobile_number : event.target.mobile.value,
        country_name : event.target.country.value,
        state_name : event.target.state.value 
    }

    var data = [userData, ...userInfos];

    userInfos = data;
    displayUser(userInfos)

    localStorage.setItem('userInfos', JSON.stringify(userInfos));

    // console.log(email);

    // event.target.email.value = '';
    event.target.reset();

    var showStates = '<option value="">Select State</option>';
    document.getElementById('state').innerHTML = showStates;
});