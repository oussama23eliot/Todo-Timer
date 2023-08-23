import { createContext, useReducer } from 'react';

export const TodoContext = createContext([]);
const todoReducer = (state, action) => {
    switch (action.type) {
        
        case 'ADD': return [...action.payload];
        case 'NEXT': return state.map((item) => {
            if (item.id == action.payload.id) {
                item.title = action.payload.title;
                item.description = action.payload.description
            }
            return item;
        })
        case 'DELETE': return state.filter((item) => item.id !== 0)
        default:
            new Error();
    }
}


export const NextContext = createContext([]);

const nextReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': return [...action.payload];
    }
}
    

export const GlobalProvider = (props) => {
    const [todoItems, dispatchTodoItems] = useReducer(todoReducer, []);
    const [nextItems, dispatchNextItems] = useReducer(nextReducer, []);

    return (
        <TodoContext.Provider {...props} value={{ todoItems,nextItems,dispatchNextItems, dispatchTodoItems }}>
            {props.children}
        </TodoContext.Provider>
    );

}