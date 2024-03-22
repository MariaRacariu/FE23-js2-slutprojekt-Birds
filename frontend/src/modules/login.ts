import { hideAllContentBoxes } from "../main.ts";
import { content } from "../modules/constant.ts";

export function generateLoginContainer() {
    hideAllContentBoxes();
    const div = document.querySelector("#displayLoginContainer") as HTMLDivElement;
    div.classList.add(content.isActive);
}