(async function load(){
    //Constante response espera a que termine el fetch
    async function getData(url){
        const response =  await fetch(url);
        const data = await response.json();1
        return data;
    }
    
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
    console.log('actionList', actionList);
    const $actionContainer = document.querySelector('#action');
    actionList.data.movies.forEach((movie) => {

        //Transformamos el html en un elemento para modificar por javascript
        const $html = document.implementation.createHTMLDocument();    
        $html.body.innerHTML = videoItemTemplate(movie);

        $actionContainer.append($html.body.children[0]);
    });
    const terrorList = await getData('https://yts.am/api/v2/list_movies.json?genre=terror');
    
    console.log('terrorList', terrorList);
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation');

    //Este console log no se mandará hasta que todo lo anterior acabe.
    console.log('animationList', animationList);
})()

    
    const $dramaContainer = document.getElementById('#drama');
    const $animationContainer = document.getElementById('#animation');
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
console.log(videoItemTemplate);




