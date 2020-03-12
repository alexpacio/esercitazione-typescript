"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuPages_1 = require("./MenuPages");
class MenuHandler {
    constructor() {
        this.initMenu();
    }
    showContent() {
        return this.menuPage.showContents();
    }
    selectAction(index) {
        let inputsToPass;
        if (this.menuPage instanceof MenuPages_1.MainPage) {
            const nextFunctions = this.menuPage.showContents()[index - 1].next;
            this.path = nextFunctions;
        }
        else if (this.menuPage instanceof MenuPages_1.InputField) {
            inputsToPass = this.menuPage.getUserInput();
        }
        else {
            this.cursor++;
        }
        this.menuPage = new this.path[this.cursor]();
    }
    typeInput(input) {
        this.menuPage.setUserInput(input);
    }
    goBack() {
        if (this.cursor > 0) {
            this.cursor--;
            this.menuPage = new this.path[this.cursor]();
        }
        else {
            this.menuPage = new MenuPages_1.MainPage();
        }
    }
    initMenu() {
        this.menuPage = new MenuPages_1.MainPage();
        this.cursor = 0;
    }
}
exports.MenuHandler = MenuHandler;
