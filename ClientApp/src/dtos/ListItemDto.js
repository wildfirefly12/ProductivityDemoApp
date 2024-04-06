export class ListItemDto {
    constructor(id, description, isChecked, listId){
        this.id = id || null;
        this.description = description;
        this.isChecked = isChecked;
        this.listId = listId;
    }
}