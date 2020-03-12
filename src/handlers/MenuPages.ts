export interface IMenuAction {
    title: string;
    next?: any;
}

export abstract class MenuPage {
    protected previousPages: any[];
    private contents: IMenuAction[];
    protected abstract pageName: string;
    protected userInput: string;

    constructor(contents: IMenuAction[]) {
        this.contents = contents;
    }

    public getInstancedPreviousPages() {
        return this.previousPages;
    }

    public showContents(): IMenuAction[] {
        return this.contents;
    }

    public getUserInput(): string {
        return this.userInput;
    }

    public setUserInput(userInput: string): void {
        this.userInput = userInput;
    }

    protected validateInput(possibleChoices: string[], input: string): void {
        if (!possibleChoices.find(e => e === input)) {
            throw new Error("Passed parameter is not valid");
        }
    }
}

export class InputField extends MenuPage {
    protected pageName = "Inserisci valore";
    protected previousInputs: object[];

    constructor(previousInputs: object[]) {
        super([]);
        this.previousInputs = previousInputs;
    }

    public setUserInput(userInput: string): void {
        this.dataCollected = userInput;
    }
}


export class SaveInputField extends MenuPage {
    protected pageName = "Confermi?";

    constructor() {
        super([
            {
                title: "Sì",
                // next: null  WIP: Add save handler and pass dataCollected
            },
            {
                title: "No"
            }
        ])
    }
}


export class AddAnimalToDatabasePage extends MenuPage {
    protected pageName = "Aggiungi un animale";

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
        ])
    }
}

export class SelectTypePage extends MenuPage {
    protected pageName = "Seleziona tipo";

    constructor() {
        super([
            {
                title: "Cane"
            },
            {
                title: "Gatto"
            }
        ])
    }
}


export class MainPage extends MenuPage {
    protected pageName = "Benvenuto nell'applicazione";

    constructor() {
        super([
            {
                title: "Aggiungi animale",
                next: [SelectTypePage, AddAnimalToDatabasePage, InputField]
            },
            {
                title: "Rimuovi animale",
                next: null // WIP
            },
            {
                title: "Modifica animale",
                next: [SelectTypePage, AddAnimalToDatabasePage]
            },
            {
                title: "Mostra lista degli animali",
                next: [SelectTypePage, AddAnimalToDatabasePage]
            },
        ])
    }
}