import { Todo } from '../components/model/model';

export interface Store {
    todos:Todo[];
    completedTodos:Todo[];
}