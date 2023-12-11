// Sukurkite puslapį, kuriame būtų forma su vienu input - fullName.
// * Įvedus vardą ir pavardę, juos padalina į dvi dalis (name ir surname).
// * Vardą ir pavardę įdeda į objektą, o objektą - į array.
// * Šį array išsaugo localStorage.
// * Po forma sukurkite lentelę joje atvaizduokite informaciją iš localStorage.
// * Papildomai: pirmo ir paskutinio ištrynimas iš localstorage

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputForm");
    const fullNameInput = document.getElementById("fullName");
    const infoTableBody = document.querySelector("#infoTable tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = fullNameInput.value.trim()

        if (fullName) {
            const [name, surname] = fullName.split(" ")
            const person = {
                name,
                surname
            }

            const storageArray = JSON.parse(localStorage.getItem("persons")) || []
            storageArray.push(person)
            localStorage.setItem("persons", JSON.stringify(storageArray))
            console.log(localStorage.getItem("persons"))

            updateTable()
            printAllNames()
            fullNameInput.value = ""
        }
    })

    function updateTable() {
        infoTableBody.innerHTML = ""

        const storageArray = JSON.parse(localStorage.getItem("persons")) || []

        storageArray.forEach(person => {

            const row = document.createElement("tr")

            const nameCell = document.createElement("td")
            nameCell.textContent = person.name

            const surnameCell = document.createElement("td")
            surnameCell.textContent = person.surname

            row.appendChild(nameCell)
            row.appendChild(surnameCell)

            infoTableBody.appendChild(row)
        })
    }

    updateTable()

    function printAllNames() {
        const storageArray = JSON.parse(localStorage.getItem("persons")) || []

        if (storageArray.length > 0) {
            console.log("All Names:")
            storageArray.forEach(person => {
                console.log(`${person.name} ${person.surname}`);
            })
        } else {
            console.log("No names in localStorage.")
        }
    }

    printAllNames()

    const deleteFirstButton = document.getElementById("deleteFirstButton")
    const deleteLastButton = document.getElementById("deleteLastButton")

    deleteFirstButton.addEventListener("click", deleteFirst)
    deleteLastButton.addEventListener("click", deleteLast)

    function deleteFirst() {
        const storageArray = JSON.parse(localStorage.getItem("persons")) || []

        if (storageArray.length > 0) {
          
            storageArray.shift()
           
            localStorage.setItem("persons", JSON.stringify(storageArray))
        
            updateTable()
        } else {
            console.log("No names in localStorage to delete.")
        }
    }

    function deleteLast() {
        const storageArray = JSON.parse(localStorage.getItem("persons")) || []

        if (storageArray.length > 0) {
           
            storageArray.pop()
          
            localStorage.setItem("persons", JSON.stringify(storageArray))
          
            updateTable()
        } else {
            console.log("No names in localStorage to delete.")
        }
    }
})