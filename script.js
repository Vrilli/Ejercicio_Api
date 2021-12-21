const API_URL = 'https://rickandmortyapi.com/api/character'
//const IMG_PATH = `https://rickandmortyapi.com/api/character`
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name='


const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const h2 = document.querySelector('h2')


h2.addEventListener('click', () => {
    getcharacter(API_URL)
})

 const getcharacter = (url) => {
    const peticion = fetch(url)
    peticion.then((resp) => resp.json())
         .then((data) => showcharacter(data.results))
         .catch((error) =>
             swal.fire({
                 title: "Hubo un error con el servidor",
                 text: "Intente de nuevo mas tarde",
                 icon: "warning",
                 confirmButtonText: "Aceptar",
             })

         );
 }
 
 // Me Arroja un error.
// const getcharacter = (character) => {
//     const peticion = fetch(character);
//     peticion
//         .then((resp) => resp.json())
//         .then((data) => showcharacter(data.results))
//         .catch((error) =>
//             swal.fire({
//                 title: "Hubo un error con el servidor",
//                 text: "Intente de nuevo mas tarde",
//                 icon: "warning",
//                 confirmButtonText: "Aceptar",
//             })

//         );
// }




getcharacter(API_URL)


const showcharacter = (character) => {
    console.log(character);
     if (character.length == 0) {
        swal.fire({
             title: 'Pelicula no encontrada',
            text: 'Intenta con otro nombre',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
         })
     } else {
        main.innerHTML = ''
        character.forEach(character => {
            const { id, name, status, species, gender, image  } = character

            const divcharacter = document.createElement('div')
            divcharacter.classList.add('character')
            divcharacter.innerHTML = `
            <div class="target">
            <div>
              <img src="${image}" />
            </div>
            <div id="${id}">
              <h4>${name}</h4>
            </div>
            <div class="status">
              <h5>Estado</h5>
              <span>${status}</span>
            </div>
            <div class="status2">
              <h5>Genero</h5>
              <span>${gender} - ${species}</span>
            </div>
          </div>
        `
            main.appendChild(divcharacter)
        })
    }
}

const getClassByRate = (rate) => {
    if (rate < 4) {
        return "red"
    } else if (rate > 6) {
        return "green"
    } else {
        return "orange"
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getcharacter(SEARCH_URL + searchTerm)
        search.value = ""
    } else {
        window.location.reload()
    }
})