const form = document.querySelector('#search-form > form');
const input: HTMLInputElement | null = document.querySelector('#input-localizacao');

const sectionTempInfo = document.querySelector('#temp-info')

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!input || !sectionTempInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert ('O local precisa ter pelo menos 3 letras');
    return;
  }


  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=443af06faee912a1add2b28ae6a1ccc4&lang=pt_br&units=metric`);
  
    const dados = await resposta.json();
  
    //console.log(dados);
  
    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png` 
    }
  
    sectionTempInfo.innerHTML = `
    <div class="temp-date">
          <h2>${infos.local}</h2>
    
          <span>${infos.temperatura}°C</span>
        </div>
  
        <img src="${infos.icone}"/>
    `;
  } catch (err) {
    console.log("Deu um erro na obtenção dos dados da API.", err);
  }
})
