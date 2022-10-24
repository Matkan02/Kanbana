export default class kanban{
    constructor(root){
        this.root = root;

        kanban.columns().forEach(column =>{
            const columnView = new column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);

        });
    }

    static columns(){
        return[
            {
                id: 1,
                title: "No started"
            },
            {
                id:2,
                title: "In prgress"
            },
            {
                id: 3,
                title: "Completed"
            }
        ];
    }
}