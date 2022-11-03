document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){
        clearInfo();
        showWaring('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e4aca70c93f2f23f07c81fe73a598887&units=metric&lang=pt_br`;// appid = (apikey)
        
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                WindAngle: json.wind.deg
            });

        }else{
            clearInfo();
            showWaring('Não encontramos essa localização')
        }

        }else{
            clearInfo();
        };

});

function showInfo(json){
    showWaring('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.WindAngle -90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
    
}

function clearInfo(){
    showWaring('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWaring(msg){
    document.querySelector('.aviso').innerHTML = msg;
}