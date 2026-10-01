//window.onload is shorthand for:
window.addEventListener("load", () => {
    //document.body is the selector to retrieve the body html document

    //e is a parameter in the anonymous arrow funciton
    //autamatically populated by js
    document.body.addEventListener("click", (e) => {
        console.log(e)
        console.log('document.body was clicked')
        console.log('${e.clientX},${e.clientY}')
    })
    //using ids are good for js
    //any time with interaction, use id
    let textDiv = document.getElementById('text')

    // key presses needs to be on the document itself
    document.addEventListener('keydown', (e) => {

        console.log('key pressed!')
        console.log(e.key)

        //adding the key that was typed to the div on the page
        textDiv.textContent += e.key

        if (e.key == ' ') {
            textDiv.textContent += '👁️'
        }
    })
})