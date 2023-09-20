export class TaskDto {
    constructor(title, description, dueDate, priority, isRecurring, isComplete, userId){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isRecurring = isRecurring;
        this.isComplete = isComplete;
        this.userId = userId;
    }
}