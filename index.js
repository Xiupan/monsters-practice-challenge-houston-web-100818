let limitResults = 50
let pageResults = 1

const monsterContainer = document.querySelector('#monster-container')
const newMonsterForm = document.querySelector('#create-monster-form')

const monsterNameInput = document.querySelector('#monster-name')
const monsterAgeInput = document.querySelector('#monster-age')
const monsterDescInput = document.querySelector('#monster-desc')
const monsterFormButton = document.querySelector('#create-monster-btn')

const forwardButton = document.querySelector('#forward')
const backButton = document.querySelector('#back')

const render = () => {
  fetch(`http://localhost:3000/monsters?_limit=${limitResults}&_page=${pageResults}`)
    .then((r) => {
      return r.json()
    }).then((monsters) => {
      // console.log(monsters.length);
      limitResults = monsters.length

      monsterContainer.innerHTML = ''

      for (let a = 0; a < monsters.length; a++) {
        const monsterName = document.createElement('h2')
        const monsterAge = document.createElement('h4')
        const monsterDesc = document.createElement('p')
        const hr = document.createElement('hr')

        monsterName.innerHTML = monsters[a].name
        monsterAge.innerHTML = `Age: ${monsters[a].age}`
        monsterDesc.innerHTML = monsters[a].description

        monsterContainer.appendChild(monsterName)
        monsterContainer.appendChild(monsterAge)
        monsterContainer.appendChild(monsterDesc)
        monsterContainer.appendChild(hr)
      }
    })
}

monsterFormButton.addEventListener('click', (e) => {
  e.preventDefault()
  fetch(`http://localhost:3000/monsters`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: monsterNameInput.value,
      age: monsterAgeInput.value,
      description: monsterDescInput.value
    })
  }).then(render)
})

forwardButton.addEventListener('click', () => {
  if (limitResults < 50) {
    alert("This is the last page of Monsters!")
  } else {
    pageResults++
    render()
  }
})

backButton.addEventListener('click', () => {
  if (pageResults <= 1) {
    pageResults = 1
  } else {
    pageResults--
  }
  render()
})

render()
