const typeEmojis = {

    fire: "🔥",

    water: "💧",

    grass: "🌿",

    electric: "⚡",

    psychic: "🔮",

    ice: "❄️",

    fighting: "🥊",

    poison: "☠️",

    ground: "🌍",

    flying: "🕊️",

    bug: "🐛",

    rock: "🪨",

    ghost: "👻",

    dark: "🌑",

    dragon: "🐉",

    steel: "⚙️",

    fairy: "✨",

    normal: "⭐"
};





/* =========================================
            ENTER KEY SUPPORT
========================================= */

document.getElementById(
    "inputbox"
).addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        fetchData();
    }
});


const specialPokemon = {

    deoxys: "deoxys-normal",

    giratina: "giratina-altered",

    wormadam: "wormadam-plant",

    lycanroc: "lycanroc-midday",

    basculin: "basculin-red-striped",

    urshifu: "urshifu-single-strike",

    darmanitan: "darmanitan-standard"
};


/* =========================================
            FETCH DATA
========================================= */

async function fetchData(){

    try{

        const inputElement =

        document.getElementById(
            "inputbox"
        );

        const loadingElement =

        document.getElementById(
            "loading"
        );

        const searchButton =

        document.getElementById(
            "searchbox"
        );



        let name =

        inputElement.value

        .toLowerCase()

        .trim()

        .replace(/\s+/g,"-");

        if(specialPokemon[name]){
            name = specialPokemon[name];
        }



        /* ==============================
                VALIDATION
        ============================== */

        if(!name){

            loadingElement.textContent =

            "Please enter a Pokemon name or ID";

            setTimeout(() => {

                loadingElement.textContent = "";

            },3000);

            return;
        }



        /* ==============================
                LOADING STATE
        ============================== */

        searchButton.disabled = true;

        loadingElement.textContent =

        "Searching...";



        /* ==============================
                FETCH API
        ============================== */

        const url = await fetch(

            `https://pokeapi.co/api/v2/pokemon/${name}`
        );



        if(!url.ok){

            throw new Error(
                "Pokemon not found"
            );
        }



        const data = await url.json();



        /* ==============================
                POKEMON NAME
        ============================== */

        document.getElementById(
            "pokemon-name"
        ).textContent =

        data.name.charAt(0)
        .toUpperCase()

        +

        data.name.slice(1);



        /* ==============================
                POKEMON IMAGE
        ============================== */

        const Pokemonsprite =

        data.sprites.other[
            "official-artwork"
        ].front_default

        ||

        data.sprites.front_default;



        const Image =

        document.getElementById(
            "imageSprite"
        );



        Image.src = Pokemonsprite;

        Image.style.display = "block";



        /* ==============================
                POKEMON ID
        ============================== */

        document.getElementById(
            "pokemon-id"
        ).textContent =

        `#${String(data.id)
        .padStart(3,"0")}`;



        /* ==============================
                POKEMON TYPES
        ============================== */

        const typesContainer =

        document.getElementById(
            "types"
        );

        typesContainer.innerHTML = "";



        data.types.forEach(type => {

            const span =
            document.createElement("span");

            const typeName =
            type.type.name;

            const emoji =

            typeEmojis[typeName]
            || "🔹";



            span.textContent =

            `${emoji} ${typeName}`;



            span.classList.add(
                "type-badge"
            );

            span.classList.add(
                typeName
            );



            typesContainer.appendChild(
                span
            );
        });



        /* ==============================
                POKEMON STATS
        ============================== */

        const statsContainer =

        document.getElementById(
            "stats"
        );

        statsContainer.innerHTML = "";



        data.stats.forEach(stat => {

            const p =
            document.createElement("p");



            const statName =

            stat.stat.name
            .replace("-", " ");



            p.textContent =

            `${statName.charAt(0)
            .toUpperCase()
            + statName.slice(1)}
            : ${stat.base_stat}`;



            statsContainer.appendChild(p);
        });



        /* ==============================
                RESET STATE
        ============================== */

        loadingElement.textContent = "";

        inputElement.value = "";

        searchButton.disabled = false;

    }



    catch(error){

        const loadingElement =

        document.getElementById(
            "loading"
        );

        const searchButton =

        document.getElementById(
            "searchbox"
        );



        loadingElement.textContent =

        "Pokemon not found. Try another name!";

        loadingElement.style.color =
        "#ff6b6b";



        setTimeout(() => {

            loadingElement.textContent = "";

            loadingElement.style.color = "";

        },4000);



        searchButton.disabled = false;

        console.log(error);
    }
}