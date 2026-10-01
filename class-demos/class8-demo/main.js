//this is a comment
// syntax is //
//command /

alert('javascript!')
console.log('log this info to the console')
//global variable
let colors = ['#9B8816', '#F98948', '#5D3A00', '#684E32']


//shorthand for waiting for the webpage to load
//window.onload - setup/draw
//all of coce should go inside the window.onload
window.onload = () => {

    console.log('page has loaded')
    //get element by id
    //retrives single js element using an id.
    let mainElement = document.getElementById('main') //to shorten the code
    //js has the highest priority.
    mainElement.style.color = "white"
    console.log(mainElement)
    //query selector: retrives a single element using css selector
    let firstParagraph = document.querySelector('p')
    let blueParagraph = document.querySelector('.blue')
    document.querySelector('#main')

    firstParagraph.textContent = 'i have updated the text with javascript'
    blueParagraph.style.backgroundColor = 'navy'



    for (let i = 0; i < 60; i++) {

        //query selector for id works the same as getElementById
        let containerDiv = document.querySelector('#blue-div');
        //creating an element on a webpage
        //1. declare what type of element wer are creating
        let newSpan = document.createElement('span');
        //2. modify that element/ content
        newSpan.textContent = (newSpan);
        newSpan.classList.add('all-spans')
        //generate a random color
        let c = Math.floor(Math.random() * colors.length);
        newSpan.style.backgroundColor = colors[c];

        //3. add the reated element to the page

        //anywhere on the bototm of the html: document.body
        //in a specific container: select taht element
        containerDiv.appendChild(newSpan);

    }
    //set intervl is built in to js
    // 2 params
    // 1. callback
    // 2. amount of time in ms

    let rotation = 0

    setInterval(() => {
        console.log('two seconds have passed')
        //two ways to retrieve all elements in the class
        //document.getElementsByClassName('all-spans')
        let allSpans = document.querySelectorAll('.all-spans')
        console.log(allSpans)
        for (let s of allSpans) {
            //`` is above tab
            s.style.transform = `rotate(${rotation}deg)`
            rotation++
            console.log(s.style.transform)

        }
    }, 2000)
    //or
    //setInterval(function (){},2000)
    //or
    //setInterval(intervalFunction, 2000)


}




//Question: i am still abit confused over where is window.onload being used practically on website, and when do we use them.