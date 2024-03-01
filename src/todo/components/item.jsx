import { memo, useState, useCallback, useEffect } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";
import {
    ApolloClient,
    gql
  } from "@apollo/client";
  import { useMutation, useLazyQuery } from "@apollo/client";
  import { GET_ALL_TODOS, DELETE_TODO } from "../../graphql/queries";

export const Item = memo(function Item({ todo, dispatch, index }) {
    // const [getTodos, { data }] = useQuery(GET_ALL_TODOS, {
    //     variables: { arcql: "*" },
    //   });
    //   console.log("todos:", data)
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;
    const [updateTodo,{ result, loading, error }] = useMutation(
        gql`
      mutation Upsert($values: HypiUpsertInputUnion!) {
        upsert(values: $values) {
          id
        }
      }
      `
    );

      const [deleteTodo,{ response,  }] = useMutation(
        gql`
  mutation deleteItem($arcql: String!, $clearArrayReferences: Boolean = true) {
    delete(
      type: TodoItem
      arcql: $arcql
      clearArrayReferences: $clearArrayReferences
    )
  }
`,
    );

    console.log(`upsert result ${result}`)
    const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]);
    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]);

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);
  

    // useEffect(() => {
    //     const todos = async() => {
    //        await getTodos({
    //             variables: { arcql: "*" },
    //         });
    //     }
    //     todos()
    //     console.log("todos:", data)
    //   }, [getTodos]);

    const handleRemoveItem = useCallback(() => {
      deleteTodo({variables: {
        arcql: `hypi.id = '${id}'`
      }
  }).then((res) => {
            console.log("the delete res", res);
      });
      removeItem(id);
  }, []);

    const toggleCompleted = useCallback(() => {
      console.log("todos:completed", id, completed);
      toggleItem(id);
      console.log("todos:completed", id, completed);
      updateTodo({variables: {
        values: {
          TodoItem: [
            {
              hypi:{
                id: id,
              },
              completed: !completed,
            }
          ]
        }
      }});
  }, [id,toggleItem, completed]);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

            const handleUpdate = useCallback(
                (title) => {
          //         updateTodo({variables: {
          //       values: {
          //         TodoItem: [
          //           {
          //             title: title,
          //             completed:  false,
          //           }
          //         ]
          //       }
          //     }
          // });
            if (title.length === 0){
                removeItem(id);
                deleteTodo({variables: {
                  arcql: `hypi.id = '${id}'`
                }
                }).then((res) => {
                          console.log("the delete res", res);
                    });
            }
            else{
                updateItem(id, title);
                updateTodo({variables: {
                  values: {
                    TodoItem: [
                      {
                        hypi:{
                          id: id,
                        },
                        title: title,
                      }
                    ]
                  }
                }});
              }

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );
    console.log("item page is rendered:")
    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleCompleted} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={handleRemoveItem} />
                    </>
                )}
            </div>
        </li>
    );
});
