console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    const url = '/weather?address=' + search.value
    console.log(url)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = 'Temparature : '+ data.temperature
                messageFour.textContent = 'Feels like : ' + data.feelslike
            }
        })
    })
})