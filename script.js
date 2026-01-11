fetchData()

async function fetchData(){
    let name = document.getElementById("inputbox").value.toLowerCase();
    let url= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    try{
        if (!url.ok){
            alert("Pokemon not Found! Please check the name and try again.")
        }
        const data = await url.json();
        const Pokemonsprite = data.sprites.other["official-artwork"].front_default;
        const Image  = document.getElementById("imageSprite");
        Image.src = Pokemonsprite;
        Image.style.display = "block";
        console.log(data);

        document.getElementById("pokemon-id").textContent =
        `#${data.id}`;

      // Stats
      const statsContainer = document.getElementById("stats");
      statsContainer.innerHTML = "";

      data.stats.forEach(stat => {
        const p = document.createElement("p");
        p.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsContainer.appendChild(p);
      });
    }catch (error){
        console.log("Error fetching data:", error);
    }
}