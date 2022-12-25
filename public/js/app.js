// const { response } = require("express");

console.log("Client side js is linked and running");



   const weatherForm = document.querySelector('form')
   const search = document.querySelector('input')
   const messageOne = document.querySelector('#message-1')
   const messageTwo = document.querySelector('#message-2')

   weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value
    const url = 'http://localhost:3000/weather?address='+location
    messageOne.textContent = "Loading......"
    messageTwo.textContent = ''

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            // console.log(data.error)
            messageOne.textContent = data.error
            

        }else{
            messageOne.textContent = data.temperature
            messageTwo.textContent = data.place_name
        }
    })
   })

   })