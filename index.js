document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('selection');
    const number = document.getElementById('number');
    const buttonSearch = document.getElementById('btn-search');

    function getStarWarsPlanets(progress, url = 'https://swapi.co/api/planets', planets = []) {
        return new Promise((resolve, reject) => fetch(url)
            .then(response => {
                if (response.status !== 200)  {
                throw `${response.status}: ${response.statusText}`;
                }
                response.json().then(data => { 
                planets = planets.concat(data.results);
                if(data.next) {
                progress && progress(planets);
                getStarWarsPlanets(progress, data.next, planets).then(resolve).catch(reject)
                } else {
                resolve(planets);
                }
                }).catch(reject);
            }).catch(reject));
    }
    
    function progressCallback(planets) {
    }
    
    getStarWarsPlanets(progressCallback)
        .then(planets => {
        document.writeln(planets.map(p => p.name))
        })
        .catch(console.error);
});
getStarWarsPlanets();