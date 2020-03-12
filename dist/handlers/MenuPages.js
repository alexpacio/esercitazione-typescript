"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuPage {
    constructor(contents) {
        this.contents = contents;
    }
    getInstancedPreviousPages() {
        return this.previousPages;
    }
    showContents() {
        return this.contents;
    }
    getUserInput() {
        return this.userInput;
    }
    setUserInput(userInput) {
        this.userInput = userInput;
    }
    validateInput(possibleChoices, input) {
        if (!possibleChoices.find(e => e === input)) {
            throw new Error("Passed parameter is not valid");
        }
    }
}
exports.MenuPage = MenuPage;
class InputField extends MenuPage {
    constructor(previousInputs) {
        super([]);
        this.pageName = "Inserisci valore";
        this.previousInputs = previousInputs;
    }
    setUserInput(userInput) {
        this.dataCollected = userInput;
    }
}
exports.InputField = InputField;
class SaveInputField extends MenuPage {
    constructor() {
        super([
            {
                title: "Sì",
            },
            {
                title: "No"
            }
        ]);
        this.pageName = "Confermi?";
    }
}
exports.SaveInputField = SaveInputField;
class AddAnimalToDatabasePage extends MenuPage {
    constructor() {
        super([
            {
                title: "Nome"
            },
            {
                title: "Età"
            },
            {
                title: "Razza"
            },
            {
                title: "Salva record",
                next: [SaveInputField]
            }
        ]);
        this.pageName = "Aggiungi un animale";
    }
}
exports.AddAnimalToDatabasePage = AddAnimalToDatabasePage;
class SelectTypePage extends MenuPage {
    constructor() {
        super([
            {
                title: "Cane"
            },
            {
                title: "Gatto"
            }
        ]);
        this.pageName = "Seleziona tipo";
    }
}
exports.SelectTypePage = SelectTypePage;
class MainPage extends MenuPage {
    constructor() {
        super([
            {
                title: "Aggiungi animale",
                next: [SelectTypePage, AddAnimalToDatabasePage, InputField]
            },
            {
                title: "Rimuovi animale",
                next: null
            },
            {
                title: "Modifica animale",
                next: [SelectTypePage, AddAnimalToDatabasePage]
            },
            {
                title: "Mostra lista degli animali",
                next: [SelectTypePage, AddAnimalToDatabasePage]
            },
        ]);
        this.pageName = "Benvenuto nell'applicazione";
    }
}
exports.MainPage = MainPage;
