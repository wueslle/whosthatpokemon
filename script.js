let pokedata;
let tentativas = 0;
let vitorias = 0;
let dica = [];
const contador = document.getElementById("contador");
const pokephoto = document.getElementById("poke");
const title = document.getElementById("title");
const pokecall = async (id) => {
  const pokeurl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokefetch = await fetch(pokeurl);
  const pokejson = await pokefetch.json();
  let type1, type2;
  if (pokejson.types[0] && pokejson.types[1]) {
    type1 = pokejson.types[0]["type"]["name"];
    type2 = pokejson.types[1]["type"]["name"];
  } else {
    type1 = pokejson.types[0]["type"]["name"];
    type2 = "Esse pokemon possui apenas 1 tipo";
  }
  dica.push(
    `A primeira letra do nome é ${pokejson.name[0].toUpperCase()}`,
    `O número do pokemon na pokedex nacional é ${id}`,
    `O segundo tipo é ${type2}`,
    `O primeiro tipo é: ${type1}`,
    `A habilidade única do pokémon é ${pokejson.abilities[0]["ability"]["name"]}`,
    `A última letra do nome é ${pokejson.name[
      pokejson.name.length - 1
    ].toUpperCase()}`
  );
  return {
    sprites:
      pokejson.sprites["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ],
    names: pokejson.name,
    type1: type1,
    type2: type2,
    ability: pokejson.abilities[0]["ability"]["name"],
  };
};

let inputValue;
const pokeInput = () => {
  inputValue = document.getElementById("palpite").value;
  document.getElementById("palpite").value = "";
};

const activateButton = () => {
  document.getElementById("reset").style.cssText =
    "opacity: 1; pointer-events: auto; padding: 8px 20px 22px 50px; width: 112.625px; font-size: 15px; background-color: #db2f2c;";
  document.getElementById("botao-text").style.cssText =
    "opacity: 1; bottom: -10px;";
  document.getElementById("reset").removeAttribute("disabled");
};

const pokeCheck = () => {
  if (inputValue.toLowerCase() === pokedata.names) {
    pokephoto.style.cssText = "filter: brightness(1)";
    document.getElementById("botao-text").innerHTML = "Continuar";

    vitorias++;
    contador.innerHTML = vitorias;
    if (vitorias > 9) {
      contador.style.cssText = "right: 20%";
    }
    title.innerHTML = `É o ${
      pokedata.names.charAt(0).toUpperCase() + pokedata.names.slice(1)
    }!`;
    mediaQuery();
    activateButton();
    document.getElementById("palpite").setAttribute("disabled", "disabled");
  } else {
    tentativas++;
    pokeErro();
    dicas();
    if (tentativas >= 6) {
      document.getElementById("botao-text").innerHTML = "Jogar novamente";
      pokephoto.style.cssText = "filter: brightness(1)";
      document.getElementById("palpite").setAttribute("disabled", "disabled");
      title.innerHTML = `É o ${
        pokedata.names.charAt(0).toUpperCase() + pokedata.names.slice(1)
      }!`;
      mediaQuery();
      activateButton();
      vitorias = 0;
      contador.innerHTML = vitorias;
      contador.style.cssText = "right: 33%";
     
    }
  }
};

const pokeErro = () => {
  const erro = document.createElement("img");
  erro.src = "assets/pokeball.png";
  erro.id = "erro";
  erro.className = `erro${tentativas}`;
  document.getElementById("palpites").appendChild(erro);
  setTimeout(() => {
    document.getElementById("palpite").style.cssText =
      "background-color: #db2f2c";
    setTimeout(() => {
      document.getElementById("palpite").style.cssText =
        "background-color: white";
    }, 100);
  });
};

const dicas = () => {
  document.querySelector(`.erro${tentativas}`).addEventListener("click", () => {
    document.getElementById("fundo").style.cssText = "display: block";
    document.getElementById("modal").style.cssText =
      " position: absolute;border-radius: 40px;top: 45%;left: 33%;width: 10em;height: auto; z-index: 4000;background-color: var(--pokered); opacity: 1; border: 3px solid var(--pokeblue); cursor: default; font-family: sans-serif; color: var(--pokeyellow);-webkit-text-stroke: 1px var(--pokeblue); font-size: 50px;text-align: center;";
      mediaInstruction()
    document.getElementById("modal").textContent = `A ${tentativas}° dica é: ${
      dica[tentativas - 1]
    }`;
  });
  document.getElementById("fundo").addEventListener("click", () => {
    document.getElementById("fundo").style.cssText = "display: none";
  });
  document.querySelector(`.erro${tentativas - 1}`).style.cssText =
    "pointer-events: none;";
};

const limpaErro = () => {
  const erros = document.getElementById("palpites");

  while (erros.hasChildNodes()) {
    erros.removeChild(erros.firstChild);
  }
};
const random = () => Math.floor(Math.random() * 1025 + 1);
const getPoke = async () => {
  const id = random();
  pokedata = await pokecall(id);
  pokephoto.src = pokedata.sprites;
  pokephoto.style.cssText = "filter: brightness(0)";
  document.getElementById("palpite").removeAttribute("disabled");
  document.getElementById("palpite").focus()
};

document.getElementById("palpite").addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    pokeInput();
    pokeCheck();
  }
});

document.getElementById("reset").addEventListener("click", (event) => {
  getPoke();
  limpaErro();
  document.getElementById("reset").style.cssText =
    "padding: 0; width: 0; color: #fff; font-size: 0px; pointer-events: none;";
  document.getElementById("reset").setAttribute("disabled", "disabled");
  tentativas = 0;
  mediaReset();
  title.innerHTML = "Quem é esse Pokémon?";

  dica = [];
});

document.getElementById("poke").oncontextmenu = function () {
  return false;
};

const instrucao = () => {
  document.getElementById("fundo").style.cssText = "display: block";
  document.getElementById("modal").style.cssText =
  "position: absolute; border-radius: 40px; top: 12%; left: 33%; width: 15em; height: auto; z-index: 4000; background-color: var(--pokeblue); border: 5px solid var(--pokered); cursor: default; color: var(--pokeyellow); -webkit-text-stroke: 1px var(--pokeye); font-size: 3vh; text-align: center; padding: 30px; font-weight: lighter; opacity: 0.8;"
    mediaInstruction()
    document.getElementById(
    "modal"
  ).textContent = `As instruções do jogo são simples: Você terá 6 chances, após o primeiro erro receberá uma dica a cada nova tentativa. Se a resposta estiver correta, o contador de vitória aumentará, caso contrário ele irá resetar. Para visualizar as dicas, clique na pokebola. Bom jogo!`;
  
  document.getElementById("fundo").addEventListener("click", () => {
    document.getElementById("fundo").style.cssText = "display: none";
   
  });
  
  
};
function mediaInstruction(x = window.matchMedia("(orientation: portrait)")) {
  if (x.matches) {
    document.getElementById("fundo").style.cssText = "display: block";
    document.getElementById("modal").style.cssText =
    "position: absolute; border-radius: 40px; top: 20%; left: 10%; width: 270px; height: auto; z-index: 4000; background-color: var(--pokeblue); border: 5px solid var(--pokered); cursor: default; font-family: sans-serif; color: var(--pokeyellow); -webkit-text-stroke: 1px var(--pokeye); font-size: 27px; text-align: center; padding: 10px; font-weight: lighter; opacity: 0.8;"
    document.getElementById(
      "modal"
    ).textContent = `As instruções do jogo são simples: Você terá 6 chances, após o primeiro erro receberá uma dica a cada nova tentativa. Se a resposta estiver correta, o contador de vitória aumentará, caso contrário ele irá resetar. Para visualizar as dicas, clique na pokebola. Bom jogo!`;
    document.getElementById("fundo").addEventListener("click", () => {
      document.getElementById("fundo").style.cssText = "display: none";
      document.getElementById("palpite").focus()
    });
    
  }
}

  function mediaReset(x = window.matchMedia("(orientation: portrait)")){
    if (x.matches) {
    document.getElementById("reset").style.cssText =
    "opacity: 1; pointer-events: none; padding: 8px 20px 22px 50px; width: 112.625px; font-size: 15px; background-color: #db2f2c;";
  document.getElementById("reset").setAttribute("disabled", "disabled");
  }
  }
function mediaQuery(x = window.matchMedia("(orientation: portrait)")) {
  if (x.matches) {
   
    title.innerHTML = `O pokemon é o ${pokedata.names}     `;
  }
}

let x = window.matchMedia("(orientation: portrait)");

x.addListener(mediaQuery);

getPoke();
