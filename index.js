const chips = document.getElementsByClassName("chip");
const input = document.getElementsByClassName("input")[0];
const contenteditable = document.getElementsByClassName("contenteditable")[0];
const suggestionsContent = document.getElementsByClassName("content")[0];


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("chip")) {
        const element = e.target;
        const cloned = element.cloneNode(true);
        cloned.classList.add("new");
        element.classList.add("new");
        if (!element.parentElement.classList.contains("input")) {
            input.appendChild(cloned);
            if (element.classList.contains("search")) {contenteditable.innerText = "";}
        } else {
            document.getElementsByClassName("content")[0].appendChild(cloned);
        }

        element.addEventListener("transitionend", () => {
            element.remove();
            cloned.classList.remove("new");

            if (input.children.length > 3) {
                input.getElementsByClassName("save-as-group")[0].classList.add("show");
            } else {
                input.getElementsByClassName("save-as-group")[0].classList.remove("show");
            }
            onInput();
        });
    }
});

const dic = [
    { name: "מוריה דביר", type: "student" },
    { name: "מוריה שרעבי", type: "student" },
    { name: "סלעית כהן", type: "student" },
    { name: "יוגב עצמי", type: "student" },
    { name: "מתמטיקה הקבצה 5", type: "group" },
    { name: "כיתה א'3, בי\"ס עננים", type: "class" },
]

const onInput = (e) => {
    //debugger
    const lastSearch = suggestionsContent.getElementsByClassName("search");
    for (let i=lastSearch.length-1; i>=0; i--) {
        lastSearch[i].remove();
    }
    
    if (e?.target?.innerText) {
        const filtered = dic.filter(x => x.name.includes(e.target.innerText.trim()));
        filtered.sort();
        filtered.forEach((x) => {
            const newEl = document.createElement("div");
            newEl.textContent = x.name;
            newEl.classList.add("chip", "search");
            suggestionsContent.appendChild(newEl);
        });
        Array.from(chips).forEach(chip => !chip.classList.contains("search") && !chip.parentElement.classList.contains("input") && chip.classList.add("hide"))
    }
    else {
        Array.from(chips).forEach(chip => chip.classList.remove("hide"));
    }
}

contenteditable.addEventListener("input", onInput);