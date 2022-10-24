import kanbanaapi from "../kanbanapi.js";
import dropzone from "./dropzone.js";

export default class item{
    constructor(id, content){

        const bottomdropzone=dropzone.createDropZone();
        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban_item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(bottomdropzone);

        const onBlur = () =>{
            const newContent = this.elements.input.textContent.trim();

            if(newContent == this.content){
                return;
            }

            this.content = newContent;
            kanbanaapi.updateItem(id,{
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onBlur);
        this.elements.root.addEventListener("dbclick", () =>{
            const check = confirm("Are you sure you want to delete this item?");

            if(check){
                kanbanaapi.deleteItem(id);

                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        this.elements.root.addEventListener("dragstart",e => {
            e.dataTransef.setData("text/plain",id);

        });
        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        })

    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class = "kanban_item" draggable="true">
            <div class = " kanban_item-input" contenteditable></div>
        </div>
        `).children[0];
    }
}