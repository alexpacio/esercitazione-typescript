"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const MenuHandler_1 = require("./MenuHandler");
class ConsoleHandler {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.menuHandler = new MenuHandler_1.MenuHandler();
        this.ask();
    }
    addBackAndClose() {
        this.contentsToShow = this.menuHandler.showContent().concat([
            {
                title: "Indietro"
            },
            {
                title: "Chiudi"
            }
        ]);
    }
    ask() {
        return new Promise(resolve => {
            this.addBackAndClose();
            const requests = "\n" + this.contentsToShow.map((e, i) => " " + (i + 1) + " : " + e.title).join("\n") + "\n\n---------\n> ";
            this.rl.question(requests, (answer) => __awaiter(this, void 0, void 0, function* () {
                resolve(answer);
                try {
                    this.type(answer);
                }
                catch (err) {
                    yield this.ask();
                    this.rl.write(err.message);
                }
            }));
        });
    }
    type(input) {
        switch (true) {
            case !isNaN(input):
                let err;
                if (input < 1 || input > this.contentsToShow.length) {
                    throw new Error("Invalid input number");
                }
                else if (this.contentsToShow.find((e, i) => (i + 1) == input && e.title === "Indietro")) {
                    this.menuHandler.goBack();
                }
                else if (this.contentsToShow.find((e, i) => (i + 1) == input && e.title === "Chiudi")) {
                    this.close();
                    break;
                }
                else {
                    this.menuHandler.selectAction(parseInt(input, 10));
                }
                this.ask();
                break;
            default:
                this.menuHandler.typeInput(input);
                this.menuHandler.goBack();
                this.ask();
                break;
        }
    }
    close() {
        this.rl.close();
    }
}
exports.ConsoleHandler = ConsoleHandler;
