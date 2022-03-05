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
// console.log(heroDisplay)
let heroURL = "api/heroes/"

fetch(heroURL, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'X-Request-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
    },
})
    .then(response => {
        return response.json()
    })
    .then(heroArray => { // heroArray (or whatever you call it) refers to whatever the bit above it returned (in this case, return response.json() )
        // console.log(heroArray)
        // Still need to edit the below from where I grabbed it on our breakout project
        for (let hero of heroArray) {
            console.log(hero.portrait);
            // let heroElement = document.createElement('li')
            let heroElement = document.createElement('div') // if making a Bulma column instead of an li
            heroElement.className = "column is-one-third"; // if making a Bulma column instead of an li
            heroElement.dataset.pk = hero.pk;
            // console.log(heroElement.dataset.pk);
            // console.log(heroElement)
            heroElement.innerText = `${hero.name} \n ${hero.alias}`
            heroDisplay.appendChild(heroElement)
            //CODE HERE to add <br> tags
            let heroLineBreak = document.createElement('br')
            heroElement.appendChild(heroLineBreak)
            //CODE HERE to add a little "x" button that allows deletion
            let heroDeleteButton = document.createElement('button')
            heroDeleteButton.className = "heroDelete";
            heroDeleteButton.innerText = `-`
            heroElement.appendChild(heroDeleteButton)
        }

        // ==========================================
        // D E L E T E  H E R O E S
        // ==========================================
        let createdHeroDelete = document.querySelectorAll(".heroDelete");
        // console.log(createdHeroDelete)

        createdHeroDelete.forEach(button => {
            let parentOfCHD = button.parentNode;
            let assocHeroPK = parentOfCHD.dataset.pk
            let heroDeleteURL = `api/heroes/${assocHeroPK}/`

            button.addEventListener("click", function (event) {
                console.log("Button clicked", button.parentNode);
                console.log(assocHeroPK);

                fetch(heroDeleteURL, {
                    method: 'DELETE',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrftoken,
                    },
                    // body: JSON.stringify(Object.fromEntries(formData)) //v1
                    // body: JSON.stringify({'name': name, 'alias': alias}) //v2
            
                })
                // .then(response => {
                //     return response.json()
                // })
                .then(data => {
                    // console.log(data)
                    parentOfCHD.style.display = "none";
                })
            })
        })
    })


// ==========================================
// D I S P L A Y  H E R O  F O R M
// ==========================================

// let heroFormDisplay = document.querySelector("#heroform-display").addEventListener("click", toggleHeroForm)

function toggleHeroForm() {
    // alert("The button works!");
    let heroForm = document.querySelector("#heroform");
    let displaySetting = heroForm.style.display;
    let heroFormDisplayButton = document.querySelector("#heroform-display");

    if (displaySetting == 'block') {
        heroForm.style.display = 'none';
        heroFormDisplayButton.innerHTML = '+';
    } else {
        heroForm.style.display = 'block';
        heroFormDisplayButton.innerHTML = 'x';
    }

}


// ==========================================
// P O S T  H E R O  F O R M  D A T A
// ==========================================

let heroForm = document.querySelector("#heroform");

heroForm.addEventListener('submit', function (event) {
    event.preventDefault()
    // console.log(event.target)
    formData = new FormData(heroForm) //v1

    // let name = document.getElementById('name').value //v2
    // let alias = document.getElementById('alias').value //v2

    fetch(heroURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(Object.fromEntries(formData)) //v1
        // body: JSON.stringify({'name': name, 'alias': alias}) //v2

    })
        .then(response => {
            return response.json()
        })
        .then(hero => {
            // console.log(data)
            // let heroElement = document.createElement('li')
            let addedHeroElement = document.createElement('div') // if making a Bulma column instead of an li
            addedHeroElement.className = "column is-one-third"; // if making a Bulma column instead of an li
            addedHeroElement.dataset.pk = hero.pk;
            // console.log(addedHeroElement.dataset.pk);
            // console.log(heroElement)
            addedHeroElement.innerText = `${hero.name} \n ${hero.alias}`
            heroDisplay.appendChild(addedHeroElement)
            //CODE HERE to add <br> tags
            let heroLineBreak = document.createElement('br')
            addedHeroElement.appendChild(heroLineBreak)
            //CODE HERE to add a little "x" button that allows deletion
            let heroDeleteButton = document.createElement('button')
            heroDeleteButton.className = "heroDelete";
            heroDeleteButton.innerText = `-`
            addedHeroElement.appendChild(heroDeleteButton)

            // ==========================================
            // D E L E T E  H E R O E S
            // ==========================================
            let createdHeroDelete = document.querySelectorAll(".heroDelete");
            // console.log(createdHeroDelete)

            createdHeroDelete.forEach(button => {
                let parentOfCHD = button.parentNode;
                let assocHeroPK = parentOfCHD.dataset.pk
                let heroDeleteURL = `api/heroes/${assocHeroPK}/`

                button.addEventListener("click", function (event) {
                    console.log("Button clicked", button.parentNode);
                    console.log(assocHeroPK);

                    fetch(heroDeleteURL, {
                        method: 'DELETE',
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRFToken': csrftoken,
                        },
                        // body: JSON.stringify(Object.fromEntries(formData)) //v1
                        // body: JSON.stringify({'name': name, 'alias': alias}) //v2
                
                    })
                    // .then(response => {
                    //     return response.json()
                    // })
                    .then(data => {
                        // console.log(data)
                        parentOfCHD.style.display = "none";
                    })
                })
            })
        })
})
