import { createContext, useReducer } from 'react';
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': return [...state, action.payload];
        case 'UPDATE': return state.map((item) => {
            if (item.id == action.payload.id) {
                item.title = action.payload.title;
                item.description = action.payload.description
            }
            return item;
        })
        case 'DELETE': return state.filter((item) => item.id !== action.payload.itemId)
        default:
            new Error();
    }
}

export const TodoContext = createContext([]);

export const GlobalProvider = (props) => {
    const [todoItems, dispatchTodoItems] = useReducer(todoReducer, []);
    return (
        <TodoContext.Provider {...props} value={{ todoItems, dispatchTodoItems }}>
            {props.children}
        </TodoContext.Provider>
    );

}