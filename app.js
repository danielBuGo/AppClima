const result = document.querySelector('.result');
const form= document.querySelector('.get-weather');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(ciudad.value === '' || pais.value ===''){
        mostrarError('ambos campos son obligatorios')
        return;
    }

    callAPI(ciudad.value, pais.value);


    // console.log(ciudad.value);
    // console.log(pais.value);
})

function callAPI(ciudad, pais){
    const apiId = '8abd5c6b22deef9e7e625ed07a7af9cf';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`
    fetch(url)
    .then(data => {
        return data.json();
    })
    .then(dataJSON =>{
        if(dataJSON.cod === '404'){
            mostrarError('Ciudad no encontrada')
        }else{
            reiniciarHTML();
            mostrarClima(dataJSON);
        }
        
    })
    .catch(error =>{
        console.log(error);
    })
  
}

function mostrarClima(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    const centrigrados = kelvinToCentigrades(temp);
    const max = kelvinToCentigrades(temp_max);
    const min = kelvinToCentigrades(temp_min);
    const contenido = document.createElement('div');
    contenido.innerHTML = `
    <h5>clima en ${name}</h5>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${centrigrados}°C</h2>
            <p>Max ${max}°C</p>
            <p>Min ${min}°C</p>
            `;
            result.appendChild(contenido);

    // console.log(name)
    // console.log(temp)
    // console.log(temp_max)
    // console.log(temp_min)
    // console.log(arr.icon)

}



function mostrarError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrades (temp){
    return parseInt(temp - 273.15);
}

function reiniciarHTML(){
    result.innerHTML = '';
}