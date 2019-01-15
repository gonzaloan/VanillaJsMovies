(async function load() {
    //Constante response espera a que termine el fetch

    const BASE_API = "https://yts.am/api/v2/";

    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $hideModal = document.getElementById('hide-modal');

    $hideModal.addEventListener('click', hideModal);

    $form.addEventListener("submit", async (event) => {
        event.preventDefault();
        $home.classList.add('search-active');
        //Creamos loader
        const $loader = document.createElement('img');
        setAttributesForElement($loader, {
            src: './img/loader.gif',
            heigth: 50,
            width: 50,
        });
        const $featuringContainer = document.getElementById('featuring');
        $featuringContainer.append($loader);
        const data = new FormData($form);
        const movieSearched = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
        let HTMLString;
        if (movieSearched.data.movies == undefined) {
            HTMLString = `
                <div>
                    <h3> No hay resultados </h3>
                </div>
            `;
        } else {
            HTMLString = searchedMovieTemplate(movieSearched.data.movies[0]);
        }
        //inyectamos en HTML
        $featuringContainer.innerHTML = HTMLString;

        // showModal();
    });

    const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);

    const terrorList = await getData(`${BASE_API}list_movies.json?genre=terror`);

    const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);

    const $actionContainer = document.querySelector('#action');
    const $terrorContainer = document.getElementById('terror');
    const $animationContainer = document.getElementById('animation');


    renderMovieList(actionList.data.movies, $actionContainer);

    renderMovieList(terrorList.data.movies, $terrorContainer);
    renderMovieList(animationList.data.movies, $animationContainer);


})()


//Template Literals

function videoItemTemplate(movie) {
    return (
        `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${movie.title}
        </h4>
        </div>
        `)
}
function searchedMovieTemplate(movie) {
    return (
        `<div class="featuring">
            <div class="featuring-image">
                <img src="${movie.medium_cover_image}" width="70" height="100" alt="${movie.title}">
            </div>
            <div class="featuring-content">
                <p class="featuring-title">Pelicula encontrada</p>
                <p class="featuring-album">${movie.title}</p>
            </div>
        </div>`
    )
}
function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
}

/**
 * Añade un evento que se gatillará al cliquear en cada imágen
 * @param  $element 
 */
function addEventClick($element) {
    $element.addEventListener('click', function () {
        showModal();
    });
}
/**
 * Función arma todo el listado de peliculas.
 */
function renderMovieList(movieList, $container) {

    $container.children[0].remove();
    movieList.forEach((movie) => {
        //Transformamos el html en un elemento para modificar por javascript
        const movieElement = createTemplate(videoItemTemplate(movie));
        $container.append(movieElement);
        //Creamos un evento de click para cada elemento
        addEventClick(movieElement);
    });
}

function showModal() {
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');

    const modalTitle = $modal.querySelector('h1');
    const modalImage = $modal.querySelector('img');
    const modalDescription = $modal.querySelector('p');

    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
}

function hideModal() {
    console.log("Aqui");
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');

    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
}

function setAttributesForElement($element, attributes) {

    for (const attribute in attributes) {
        //buscamos todos los valores
        $element.setAttribute(attribute, attributes[attribute]);

    }
}