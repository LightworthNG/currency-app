/**
 * 
 * returns the DOM element with the specified id 
 */
const element = (id) =>{
    return document.getElementById(id);
}

const getCurrencyUnit = (optionElement) => {
    return optionElement.value.substr(0,3);
}
const populateOption = (optionLocation, dataset) => {
    for(let i in dataset){
        const option = document.createElement("option");
        const {id, currencyName} = dataset[i];
        option.innerText = `${id} - ${currencyName}`;
        optionLocation.appendChild(option);
    }
}

const validateAmount = (amt) => {
    if(isNaN(amt) || amt === ""){
        alert("Please, enter a numeric value !");
    }else{
        return amt;
    }
}