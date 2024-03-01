import React, { useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL, DESERIALIZE_ITEMS } from "../constants";
import { useMutation, useQuery, gql } from "@apollo/client";
import { GET_ALL_TODOS, DELETE_TODO,  } from "../../graphql/queries";

export function Main({ todos, dispatch }) {
//     const  [addTodo,{ result, loading, error }] = useMutation(
//         gql`
//       mutation Upsert($values: HypiUpsertInputUnion!) {
//         upsert(values: $values) {
//           id
//         }
//       }
//       `,
//       {variables: {
//       values: {
//         TodoItem: [
//           {
//             title: "title",
//             completed:  false,
//           }
//         ]
//       }
//     }
// }
//     );
//     const  [deleteTodo,{ res, }] = useMutation(
//         gql`
//       mutation {
//         delete(type: TodoItem, arcql: "hypi.id = $id")
//       }
//       `,
//       {variables: {
//       id: ""
//     }
// }
//     );

    
    // addTodo({variables: {
    //     values: {
    //       TodoItem: [
    //         {
    //           title: "title",
    //           completed:  false,
    //         }
    //       ]
    //     }
    //   }
  // });
//   console.log("upsert result ", result);
//     console.log("upsert result ", error);
//     console.log("upsert result ", loading);
    const { data } = useQuery(gql`
    {
      find(type: TodoItem, arcql: "*") {
        edges {
          node {
            ... on TodoItem {
              hypi{
                id
                instanceId
                updated
                created
                trashed
              }
              title
              completed
            }
          }
          cursor
        }
      }
    }      
    `,{
      fetchPolicy: 'network-only',
    });
     // console.log("todos:", todos)
    const { pathname: route } = useLocation();
    console.log("todos:", data)
    const deserialize = useCallback((data) => dispatch({ type: DESERIALIZE_ITEMS, payload: { data } }), [dispatch]);
    if (data){
      console.log(data.find);
      let items = data?.find.edges;
      //useCallback((data) => dispatch({ type: DESERIALIZE_ITEMS, payload: { data } }), [dispatch] ); 
      deserialize(data);
    }
    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );
    // console.log("todos:", data)
    const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }), [dispatch]);
    // console.log("todos:", data)

    if (data){
      console.log(data.find);
      let items = data?.find.edges;
      //useCallback((data) => dispatch({ type: DESERIALIZE_ITEMS, payload: { data } }), [dispatch] ); 
    }
    
    const addItem = useCallback((title) => dispatch({ type: ADD_ITEM, payload: { title } }), [dispatch]);
    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
                ))}
            </ul>
        </main>
    );
}
