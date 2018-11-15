document.addEventListener("DOMContentLoaded", () => {
  let poke = document.querySelector(".poke"); // is the button
  poke.addEventListener("click", (event) => {
    poke.style.background = "lightgreen";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          let resultArr = JSON.parse(xhr.response)["results"];
          let ul = document.querySelector(".names")
          for (let i = 0; i < resultArr.length; i++) {
            let li = document.createElement("li");
            li.innerText = `${resultArr[i].name}`;
            console.log(resultArr[i])
            ul.appendChild(li);
          };
        } else {
          console.log("ERRRRRR!");
        };
      }
    }
    xhr.open("get", "https://pokeapi.co/api/v2/pokemon/", true)
    xhr.send();
  });
});
