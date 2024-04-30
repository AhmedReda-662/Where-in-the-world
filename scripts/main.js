const list = document.querySelector(".list");
list.addEventListener("click", () => {
    const regions = document.querySelector(".regions");
    regions.classList.toggle("show-opacity");

    document.querySelector(".list > li > i").classList.toggle("turn");
});

const container = document.querySelector("main > .container");

// connect to API
let connection = fetch("../API/data.json").then((data) => {
    return data.json();
}).then(myData => {
    for (let i = 0; i < myData.length; i++) {
        const box = `
            <div class="box" name="${myData[i].name}" region="${myData[i].region}"">
                <div class="flag">
                    <img src="${myData[i].flags.svg}" alt="${(myData[i].name).toLowerCase()}">
                </div>
                <div class = "statistics">
                    <h2>${myData[i].name}</h2>
                    <div>Population : <span>${myData[i].population}</span></div>
                    <div>Region : <span>${myData[i].region}</span></div>
                    <div>Capital : <span>${myData[i].capital}</span></div>
                </div>
            </div>
        `
        container.innerHTML += box;
    }
    return document.querySelectorAll(".box");
}).then((box) => {
    
    // search by region
    const region = document.querySelectorAll(".regions > li");
    region.forEach((li) => {
        li.addEventListener("click", (e) => {
            let input = e.target.textContent;
            box.forEach((e) => {
                if (e.getAttribute("region") == input) {
                    e.classList.add("show");
                    e.classList.remove("hide");
                } else {
                    e.classList.add("hide");
                    e.classList.remove("show");
                }
            })
        })
    });
    // search by country name
    const input = document.querySelector("input[type=text]");
    input.addEventListener("input", (e) => {
        let value = (e.target.value).toLowerCase();
        box.forEach((countries) => {
            const isVisiable = countries.getAttribute("name").toLocaleLowerCase().includes(value);
            countries.classList.toggle("hide", !isVisiable);
        })
    })
    

}).catch(() => {
    console.log(Error("connection Faild"));
});

// switch dark-mode
const btn = document.querySelector("button");
btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
});

