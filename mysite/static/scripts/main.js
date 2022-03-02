console.log("Javascript working!");

// ============================
// C O O K I E  S T U F F
// ============================

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


// ==========================================
// D I S P L A Y  H E R O E S
// ==========================================

let heroDisplay = document.querySelector("#hero-display")
console.log(heroDisplay)
let heroURL = "api/heroes"

fetch(heroURL, {
    method: 'GET',
    credentials: 'same-origin',
    headers:{
        'Accept': 'application/json',
        'X-Request-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
    },
})
.then(response => {
    return response.json()
})
.then(heroArray => { // heroArray (or whatever you call it) refers to whatever the bit above it returned (in this case, return response.json() )
    console.log(heroArray)
    // Still need to edit the below from where I grabbed it on our breakout project
    for (let hero of heroArray){
        let heroElement = document.createElement('li')
        console.log(heroElement)
        heroElement.innerText = `${hero.name} | ${hero.alias}`
        heroDisplay.appendChild(heroElement)
    }
})