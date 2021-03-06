/* Global Variables */
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=e37mm6d5a9f259174b4421917f0e57d0';
/* i use not real api key and you must put your api key here */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// event listerner 
document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    if(zipCode === ""){
        alert("please enter the zipcode");
    }
    const feelings= document.getElementById('feelings').value;
    getWeather(baseURL,zipCode,apiKey)
    .then(function(data){
         console.log(" the api data is :",data);
         postData('/add',{date : newDate , temp : data.main.temp , feels : feelings})
         
    })
    .then(function () {
        updateUI();
      });
};

const getWeather= async (baseURL,zip,key)=>{
          const response = await fetch(baseURL+zip+key);
          try{
              const data = await response.json();
              return data;
          }
          catch(err){
              console.log("the error is :",err);
          }
}
const postData = async ( url = '', data = {})=>{
    console.log("the post data is:",data);
       const res = await fetch(url, {
       method: 'POST', 
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
       },
      // Body data type must match "Content-Type" header        
       body: JSON.stringify(data), 
     });
   
       try {
         const newData = await res.json();
         console.log(newData);
         return newData;
       }catch(error) {
       console.log("error", error);
       };
   };
   // function to GET  project data
   const updateUI= async ()=>{
         const request = await fetch('/all');
         try{
             const allData = await request.json();
             console.log("all data is",allData);
             document.getElementById('date').innerHTML= `date: ${ allData.date} `;
             document.getElementById('temp').innerHTML= `temprature: ${ allData.temp}` ;
             document.getElementById('content').innerHTML= `feelings: ${allData.feelings}`;
         }
         catch(error) {
            console.log("error", error);
            };
   };