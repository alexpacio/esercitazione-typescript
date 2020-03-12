import { MenuPage, MainPage, InputField } from "./MenuPages";

export class MenuHandler {
    menuPage: MenuPage;
    path: any[];
    cursor: number;

    constructor() {
        this.initMenu();
    }

    showContent() {
        return this.menuPage.showContents();
    }

    selectAction(index: number) {
        let inputsToPass;
        if (this.menuPage instanceof MainPage) {
            const nextFunctions = this.menuPage.showContents()[index - 1].next;
            this.path = nextFunctions;
        } else if(this.menuPage instanceof InputField) {
            inputsToPass = this.menuPage.getUserInput();
        } else {
            this.cursor++;
        }
        this.menuPage = new this.path[this.cursor]();
    }

    typeInput(input: string) {
        this.menuPage.setUserInput(input);
    }

    goBack() {
        if(this.cursor > 0) {
            this.cursor--;
            this.menuPage = new this.path[this.cursor]();
        } else {
            this.menuPage = new MainPage();
        }
    }

    private initMenu() {
        this.menuPage = new MainPage();
        this.cursor = 0;
    }
}