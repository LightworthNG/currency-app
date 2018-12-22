/**
 * register serviceWorkers
 * Define Event handlers
 * get hold of DOM elements
 */
//register serviceWorker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js")
     .then(reg => console.log("SW registered", reg))
     .catch(err => console.log("SW reg failed", err));
}

//when the button is clicked
const convertCurrency = () => {

    // Make sure user selects viable currency
    if(optionTo.value === "Select Currency" || optionFrom.value === "Select Currency"){
        alert("Please select a viable currency");
    }else{
        //User selected viable currency
        const to = getCurrencyUnit(optionTo);
        const from = getCurrencyUnit(optionFrom);
        //get query from selections
        const query = `${from}_${to}`;//template literals
        const amt = validateAmount(amtElement.value);
        
/*
*
* get conversion factor
* build url from query => from_to
* 
*/
        var url = `https://free.currencyconverterapi.com/api/v6/convert?q=${query}&compact=ultra`;
        fetch(url).then((res) => res.json().then((data) => {
            //pull out the factor from the JSON data
            //Better -- you can use JSON.parse(data)
            const conFactor = data[query];
            const result = conFactor * amt ;
            output.innerText = `Result : ${result.toFixed(2)}`;
            //console.log("done...", result)
        }))
        
       
    }
}

//sets the currencies once the window is loaded
const setOptions = () => {
    let link = `https://free.currencyconverterapi.com/api/v6/currencies`;
    fetch(link)
    .then(response => {
        response.json()
        .then( data => {
            if(data.results){
                //Destructure result from data
               const {results} = data;
                //populate optionTo
               populateOption(optionTo, results);

                //populate optionFrom
                populateOption(optionFrom, results);
                
            }
         })
     })
}


// get hold of DOM elements
var optionFrom = element("from");
var optionTo = element("to");
const amtElement = element("amt");
var output = element("result");
const convertBtn = element("convert");

// Tie eventlisteners to window and button
window.addEventListener("load", setOptions, false);
convertBtn.addEventListener("click", convertCurrency, false);

