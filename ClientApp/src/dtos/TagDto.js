export class TagDto {
    
    constructor(id, description, color, userId) {
        this.id = id || null;
        this.description = description;
        this.color = color;
        this.userId = userId;
    }
}