import * as readline from "readline";
import { MenuHandler } from "./MenuHandler";
import { IMenuAction } from "./MenuPages";

export class ConsoleHandler {
    private rl: readline.Interface;
    private menuHandler: MenuHandler;
    private contentsToShow: IMenuAction[];

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.menuHandler = new MenuHandler();
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
        ])
    }

    ask(): Promise<string> {
        return new Promise(resolve => {
            this.addBackAndClose();
            const requests = "\n" + this.contentsToShow.map((e, i) => " " + (i + 1) + " : " + e.title).join("\n") + "\n\n---------\n> ";
            this.rl.question(requests, async answer => {
                resolve(answer);
                try {
                    this.type(answer);
                } catch(err) {
                    await this.ask();
                    this.rl.write(err.message);
                }
                 // WIP: this is unresolved for an unknown reason
            });
        });
    }

    type(input): void {
        switch (true) {
            case !isNaN(input):
                let err;
                if(input < 1 || input > this.contentsToShow.length) {
                    throw new Error("Invalid input number");
                } else if (this.contentsToShow.find((e, i) => (i + 1) == input && e.title === "Indietro")) {
                    this.menuHandler.goBack();
                } else if(this.contentsToShow.find((e, i) => (i + 1) == input && e.title === "Chiudi")) {
                    this.close();
                    break;
                } else {
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