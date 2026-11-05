//this js will go inside of hte mainstatus funciton in your bot

//partner will make reuqest to http://your ip address/get-data

//when testing on own machine, use http://localhost/6001/get-data

async function getData() {
    let url = 'http://localhost:6001/get-data' //change to partner
    let response = await fetch(url)
    let json = await response.json()
    //what do you want to do with your partner's data
    //it will use the json variable 
    console.log(response)

}
//cal getData()
getData()