export class NoteDto {
    
    constructor(id, title, content, color, categoryId, userId, tags) {
        this.id = id || null;
        this.title = title;
        this.content = content;
        this.color = color;
        this.categoryId = categoryId;
        this.userId = userId;
        this.tags = tags || null;
    }
}