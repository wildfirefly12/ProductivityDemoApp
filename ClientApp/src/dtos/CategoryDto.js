export class CategoryDto {
    
    constructor(id, description, color, isNote, isList, userId) {
        this.id = id || null;
        this.description = description;
        this.color = color;
        this.isNoteCategory = isNote;
        this.isListCategory = isList;
        this.userId = userId;
        
    }
}