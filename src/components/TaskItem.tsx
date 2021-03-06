import Task from "../domain/Task";
import * as React from "react";
import { List, Button } from "semantic-ui-react";
import TaskStore from "../store/TaskStore";
import { observer } from "mobx-react";

interface TaskItemProps {
  task: Task;
  taskStore: TaskStore;
}

@observer
export class TaskItem extends React.Component<TaskItemProps, {}> {
  public task: Task;

  public constructor(props: TaskItemProps) {
    super(props);
    this.task = props.task;
    this.toggleTaskCompleted = this.toggleTaskCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  public render() {
    return (
      <List.Item key={this.task.id} onClick={this.toggleTaskCompleted}>
        <List.Content floated="right">
          <Button size="small" onClick={this.deleteTask}>Delete</Button>
        </List.Content>
        <List.Icon
          name={this.task.isCompleted ? "checkmark box" : "square outline"}
          size="large"
          verticalAlign="middle"
        />
        <List.Content>
          <List.Header>{this.task.title}</List.Header>
          <List.Description>{this.task.body}</List.Description>
        </List.Content>
      </List.Item>
    );
  }

  private toggleTaskCompleted() {
    this.props.taskStore.toggleCompleted(this.task);
  }

  private deleteTask(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    this.props.taskStore.deleteTask(this.task);
  }
}
