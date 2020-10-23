console.log("Client Side javascript was loaded");



const weatherForm = document.querySelector('form');
const search=document.querySelector('input');
const error= document.getElementsByClassName("error")[0];
const weatherbox= document.getElementsByClassName("weather-info")[0];


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    weatherbox.innerHTML="<div class='weather-box'> Loading ... </div>";
    fetch('http://localhost:3000/weather?address='+search.value).then((response) =>{
        
        response.json().then((data)=>{
            if(data.error)
            {
                weatherbox.innerHTML="";
                error.innerHTML=data.error;
            }
            else
            {
                error.innerHTML="";
                weatherbox.innerHTML="<div class='weather-box'>Weather Info<br>"+data.location+"<br>"+data.forecast+"</div>";
            }
        });
});
});