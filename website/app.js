/* Global Variables */
const API_key="db53f6a4ca3753b78817414fb95145c0";
let generateBtn=document.getElementById("generate");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//GET Request from weather Data website

generateBtn.addEventListener("click",async function getDataFromAPI(){
    
    let zipCode=document.getElementById("zip").value;
    const feelings=document.getElementById("feelings").value;

if(zipCode.length<5)
{
    alert("Please Enter Correct ZipCode");
   
}

else
{
    const API_Call=`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_key}&units=metric`;
    let response=await fetch(API_Call);

    try{
        let weatherData=await response.json();
      
       let weatherDataObj={
                    date:newDate,
                    temp:weatherData.main.temp,
                    content:feelings
                }
       
        
        //post request to server
        let storeData=await fetch('/storeData',{method:'POST',credentials:'same-origin', headers:{'content-Type':'application/json'},body:JSON.stringify(weatherDataObj)});
      
        //get request from server
        let getData=await fetch('/sendData',{method:'GET',headers:{'content-Type':'application/json'}});
        let returnedData= await getData.json();
       
        //updating UI
        updateUI(returnedData); 
    }
    catch(error)
    {
        console.log("Error"+error);
    }
}});


//Updating UI
function updateUI(returnedData){
    const date=document.getElementById("date");
    const temp=document.getElementById("temp");
    const content=document.getElementById("content");
    
    date.innerHTML="Date is: "+returnedData.date;
    temp.innerHTML="Temp is: "+returnedData.temp;
    content.innerHTML="Feeling is: "+returnedData.content;
    }
