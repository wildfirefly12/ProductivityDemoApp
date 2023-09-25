export class TaskDto {
    constructor(id, title, description, dueDate, priority, isRecurring, isComplete, userId, tags){
        this.id = id || null;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isRecurring = isRecurring;
        this.isComplete = isComplete;
        this.userId = userId;
        this.tags = tags || null;
    }
}