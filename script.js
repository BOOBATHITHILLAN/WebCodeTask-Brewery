// Copy and save Brewery API URL to variable
let BreweryAPIurl = 'https://api.openbrewerydb.org/breweries';

//filterEmptydata
function DataNullFilter(data) {
    if (data === null) {
        return "N/A";
    } else {
        return data;
    }
}

async function handlesearch(){
    let Input=document.querySelector(".inputvalue");
    try{
            // Fetch data from API
            let BreweryResponse = await fetch(BreweryAPIurl);
    
           // COnvert json to object
            let BreweryData = await BreweryResponse.json();
            
            //select row 2
            let Row = document.querySelector(".content-1");
            Row.innerHTML="";
            
            let Data=BreweryData.filter(BreweryData=>{

                
                let BreweryName = DataNullFilter(BreweryData.name);

                //BreweryName convert to lowercase
                let NameSplit=BreweryName.split("").map(Str=>{                    
                    if(Str.charCodeAt(0)>=65 || Str.charCodeAt(0)<=90){
                        return Str.toLowerCase();
                    }else{
                        return Str;
                    }
                })

                //Input value convert to lowercase
                let InputSplit=Input.value.split("").map(Str=>{
                    if(Str.charCodeAt(0)>=65 || Str.charCodeAt(0)<=90 || Str.charCodeAt(0)<=122 || Str.charCodeAt(0)>=97){
                        return Str.toLowerCase();
                    }else{
                        return Str;
                    }
                })

                //Get Brewery type
                let BreweryType = DataNullFilter(BreweryData.brewery_type);
    
                //Get Brewery Street
                let BreweryStreet = DataNullFilter(BreweryData.street);
    
                //Get city
                let BreweryCity = DataNullFilter(BreweryData.city);
    
                //Get State
                let BreweryState = DataNullFilter(BreweryData.state);
    
                //Get pincode
                let Brewerypincode = DataNullFilter(BreweryData.postal_code);
    
                //Address
                let BreweryAddress = BreweryStreet + " , " + BreweryCity + " , " + BreweryState + ", " + Brewerypincode;
    
                //Get Brewery Website URL
                let BreweryUrl = DataNullFilter(BreweryData.website_url);
    
                //Get Brewery Phone Number
                let BreweryPhoneNumber = DataNullFilter(BreweryData.phone);

                //condition to check input value with Name
                if(NameSplit.join("").includes(InputSplit.join(""))){
                    
                    let BreweryDetails = document.createElement("div");
                    BreweryDetails.className = " col-sm-12 col-lg-5  serch-control m-3 d-flex justify-content-center align-items-center";
                    BreweryDetails.innerHTML = `
                    <div class="bg-info bg-gradient bg-opacity-10" style="width:100%; height:15rem">
                        <ul type="none">
                            <li>
                                <p><span class="fw-bold" >Name : </span> ${BreweryName}</p>
                                <p><span class="fw-bold">Type : </span>${BreweryType} </p>
                                <p><span class="fw-bold">Address : </span>${BreweryAddress} </p>
                                <p><span class="fw-bold">url : </span> <a href="${BreweryUrl}" target="_Blank" class="fw-bold">${BreweryUrl}</a> </p>
                                <p><span class="fw-bold">Phone Number : </span> ${BreweryPhoneNumber} </p>
                            </li>
                        <ul>
                    </div>
                    `

                    Row.appendChild(BreweryDetails);
                    
                }
                
            })
            //condition to check filter done or not
            if(Row.innerHTML.length===0){
                Row.innerHTML="Result Not found"

            }
            
                      
            
        }catch(error){
            
            //error output
            console.error('Error:', error);
        }
    
    
}

//refresh input for every letter type
function refresh(){
    let Input=document.querySelector(".inputvalue");
    if(Input.length!=0){
        handlesearch();
    }
}

//every input value taken to check availability

setInterval(refresh,1000);


//content added to body
document.body.innerHTML = `  
<div class="container-fluid bg-gradient">
    <div class="row d-flex justify-content-center align-items-center m-4">
       
       
            <div class="input-group mt-4 ">
                <input type="text" class="form-control inputvalue" placeholder="Search Brewery....">
                <span onclick="handlesearch()" class="input-group-text btn btn-secondary searchbutton">Search</span>
            </div>
        

    </div>
</div>
<div class="container-fluid bg-gradient">
   
    <div class="row content-1 d-flex justify-content-center align-items-center m-4">
   
    </div>    

</div>`