import kanbanaapi from "../kanbanapi";
import item from "./item";

export default class column{
    constructor(id, title){
        this.elements = {};
        this.elements.root = column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban_column-title");
        this.elements.items = this.elements.root.querySelector(".kanban_column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban_add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(todropzone);

        this.elements.addItem.addEventListener("click", () =>{

            const newItem = kanbanaapi.insertItem(id,"");

            this.renderItem(newItem);

        });

        kanbanaapi.getItems(id).forEach(item => {
           this.renderItem(item);
            
        });

    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="kanban_column">
        <div class="kanban_column-title"></div>
        <div class="kanban_column-items"> </div>
        <button class="kanban_add-item" type="button">ADD</button>
        </div>` 
        ).children[0];
    }

    renderItem(data){
        const item = new item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);


    }
}