let pokeResults = [];

document.addEventListener('DOMContentLoaded', () => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let pokeResponse = JSON.parse(xhr.response);
        console.log(pokeResponse);
        pokeResults = pokeResponse.results;
      } else {
        console.log('err');
      }
    }
  };

  let button = document.querySelector('button');
  button.addEventListener('click', () => {
    let li = document.querySelector('li');
    return !li ? addPokemon() : clearAddPokemon();
  });
  xhr.open('get', 'https://pokeapi.co/api/v2/pokemon/', true);
  xhr.send();
});

const addPokemon = () => {
  let randomPokemon = getRandomIndex(pokeResults);
  getURL(randomPokemon);
};

const getURL = (pokemon)=> {
  let url = pokemon.url;

  let pxhr = new XMLHttpRequest();
  pxhr.onreadystatechange = function () {
    if (pxhr.readyState === 4) {
      if (pxhr.status === 200) {
        let pokemonResponse = JSON.parse(pxhr.response);
        createLiAddPokemon(pokemon.name, pokemonResponse.sprites);
      }
    }
  };

  pxhr.open('get', url, true);
  pxhr.send();
};

const createLiAddPokemon = (name, sprites)=> {
  let ul = document.querySelector('.pokemon');
  let li = document.createElement('li');
  let p = document.createElement('p');
  let img = document.createElement('div');
  img.classList.add('img');
  img.style.backgroundImage = `url(${sprites.front_default})`;
  p.innerText = `${name}`;
  img.style.backgroundRepeat = 'no-repeat';
  li.appendChild(p);
  li.appendChild(img);
  if (!sprites.front_default) {
    console.log(sprites.front_default, 'image not found');
    let err = document.createElement('p');
    err.innerText = 'Pokemon Image Not Found in Pokedex!';
    li.append(err);
  }

  ul.appendChild(li);
};

const clearAddPokemon = () => {
  let li = document.querySelector('li');
  li.parentNode.removeChild(li);
  let randomPokemon = getRandomIndex(pokeResults);
  getURL(randomPokemon);
};

const getRandomNum = (len) => (Math.floor(Math.random() * len));

const getRandomIndex = (arr) => (arr[getRandomNum(arr.length)]);
