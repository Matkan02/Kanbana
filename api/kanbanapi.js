export default class kanbanaapi{
    static getItems(columnId){
        const column = read().find(column => column.id == columnId);

        if(!column){
            return [];
        }

        return column.items;
    }

    static insertItem(columnId, content){
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content

        };
        if(!column){
            throw new Error("Column does not exist.");
        }

        column.items.push(item);
        save(data);

        return item;
    }

    static updateItem(itemId,newprops){
        const data = read();
        const [item,currenColumn] = (() =>{
            for(const column of data){
                const item = column.items.find(item => item.id == itemId);

                if(item){
                    return[item, column];
                }
            }
        })();

        if(!item){
            throw new Error("Item not found");
        }

        item.content = newprops.content === undefined ? item.content : newprops.content;

        if(
            newprops.columnId !== undefined 
            && newprops.position !== undefined
        ){
            const targetColumn = data.find(column => column.id == newprops.columnId);

            if(!targetColumn){
                throw new Error("Target column not found");
            }

            currentColumn.items.splice(currenColumn.items.indexOf(item),1);

            targetColumn.items.splice(newprops.position,0,item);
        }

        save(data);
    }

    static deleteItem(itemId){
        const data = read();

        for(const column of data){
            const item = column.items.find(item => item.id == itemId);

            if(!item){
                column.items.splice(column.items.indexOf(item),1);
            }

            

            
        }


        save(data);
    }

}

function read(){
    const json = localStorage.getItem("kanban-data");
    if(!json){
        return [
            {
                id:1,
                items: []

            },
            {
                id: 2,
                items: []
            },
            {
                id:3,
                items: []
            },
        ];
    }

    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("kanban-data", JSON.stringify(data));
}