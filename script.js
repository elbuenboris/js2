const API_KEY = 'ce2911d7ca3238cb70174fc8ba02b877';
function consultClimate() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetch(url)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Error en la respuesta de la API');
            }
        })
        //Mostrar resultado en la tabla, tomando la respuesta de la solicitud HTTP en formato JSON y actualiza la tabla HTML
        .then(data => {
            const table = document.getElementById('table-climate').getElementsByTagName('tbody')[0];
            const row = table.insertRow();
            row.insertCell().innerHTML = data.name;
            row.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
            row.insertCell().innerHTML = data.weather[0].description;
        })

        .catch(error => {
            console.error('Error al consultar clima', error);
        });
}


function consultCLimates() {
    const cities = document.getElementById('cities').value.split(',').map(city => city.trim());
    Promise.all(cities.map( city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        return fetch(url)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error en la respuesta de la API');
                }
            })
            .then(data => {
                const table = document.getElementById('table-climate').getElementsByTagName('tbody')[0];
                const row = table.insertRow();
                row.insertCell().innerHTML = data.name;
                row.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
                row.insertCell().innerHTML = data.weather[0].description;
            })
            .catch(error => {
                console.error('Error al consultar clima', error);
            })
    }))
}

function cleanTable(){
    const table = document.getElementById(`table-climate`).getElementsByTagName(`tbody`);
    for(let i = 0 ; i<table.length; i++){
        table[i].innerHTML="";
    }
}

