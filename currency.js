

var myHeaders = new Headers();
myHeaders.append("apikey", "Th1OTZbV4oO6iZncBPNqtheV81LnoURx");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


//get API call
async function getAPI(url){

    try {
        let response = await fetch(url, requestOptions);  // awaits for fetch to grab URL, then puts promise content into response (either resolve or reject) 
        //return await response.json(); // awaits for response to be parsed
        return await response.json();

    } catch (error) {  // Catches errors
        console.log(error);
    }    
    
    };

//get symbols
async function getCurrencySymbols(){
        let currencySymbols = await getAPI("https://api.apilayer.com/exchangerates_data/symbols");  // takes posts from URL, passes it to
        //return console.log(Object.keys(currencySymbols.symbols)); //testing
        return  Object.keys(currencySymbols.symbols); // returns array of symbols to be put into the dropdown menu
        
    }


async function addSymbols(){    // adds all symbols from fetched symbol list into the dropdown.
    let symbols = await getCurrencySymbols();
    let baseCurrencyDrop = document.querySelector("#base-currency");
    let targetCurrencyDrop = document.querySelector("#target-currency");
    

    symbols.forEach(symbol => {
        currSymb = document.createElement("option");
        currSymb.textContent = symbol;
        currSymb.value = symbol;
        baseCurrencyDrop.appendChild(currSymb);
        
    });
    
    symbols.forEach(symbol => {
        currSymb = document.createElement("option");
        currSymb.textContent = symbol;
        currSymb.value = symbol;
        targetCurrencyDrop.appendChild(currSymb);
    });

}
//addSymbols();

//convert currency

async function convCurrency(target, base, amount){
        let result = await getAPI(`https://api.apilayer.com/exchangerates_data/convert?to=${target}&from=${base}&amount=${amount}`);
        cleanUp("converted-amount");
        let span = document.getElementById("converted-amount");
        let newElement = document.createElement("p");
        let textNode = document.createTextNode(result.result);
        newElement.appendChild(textNode);
        span.appendChild(newElement);

};

//convCurrency('usd','jpy',11); //test

//function to take values in the currency fields to convert to push arguments to conv currency.
function convertValues(){    
    let base = document.querySelector("#base-currency");
    let baseCurr = base.value;

    let target = document.querySelector("#target-currency");
    let targetCurr = target.value;

    let amount = document.querySelector("#amount");
    let amountConv = amount.value;

    convCurrency(targetCurr,baseCurr,amountConv);
    
}

//historical rates

async function getHistorical(base, target){

    let today = new Date();
        today.setDate(today.getDate())
        const formatedToday = today.toISOString().slice(0, 10);
        //console.log(formatedToday);
        
        
        let minusNinety = new Date();
        minusNinety.setDate(minusNinety.getDate() - 90);
        const formatedNinety = minusNinety.toISOString().slice(0, 10);
        //console.log(formatedNinety);

    let result = await getAPI(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${formatedToday}&end_date=${formatedToday}`);
    //cleanUp("historical-rates-container")

    console.log(result.rates);


}

getHistorical();






//event listeners

// document.querySelector("#base-currency").addEventListener("change", function() {
//     convertValues();


// });

// document.querySelector("#target-currency").addEventListener("change", function() {
//     convertValues();

// });

// document.querySelector("#amount").addEventListener("change", function() {
//     convertValues();

// });

// document.querySelector("#historical-rates").addEventListener("click", function() {
    // let base = document.querySelector("#base-currency");
    // let baseCurr = base.value;

    // let target = document.querySelector("#target-currency");
    // let targetCurr = target.value;

// });



//clean up functions

function cleanUp(eleID){
    var element = document.getElementById(`${eleID}`);
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
}

