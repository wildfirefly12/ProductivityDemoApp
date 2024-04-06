export class ListDto {

    constructor(id, title, categoryId, userId) {
        this.id = id || null;
        this.title = title;
        this.categoryId = categoryId;
        this.userId = userId;
    }
}