import { gql } from "@apollo/client";

export const LoginByEmailQuery = gql`
  query  login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      sessionToken
      sessionExpires
      errorCode
      errorMsg
    }
  }
`;

export const ProductFieldsFragmentDoc = gql`
  fragment ProductFields on Todos {
    hypi {
      id
    }
    title
    person
    date
    status
  }
`;

export const GET_ALL_TODOS = gql`
  query getTodos($arcql: String!) {
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
`;
export const UPDATE_TODOS = gql`
  mutation upsert($values: HypiUpsertInputUnion!) {
    upsert(values: $values) {
      id
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $email: String!
  ) {
    createAccount(
      value: {
        username: $username
        password: { value: $password }
        emails: [{ value: $email }]
      }
    ) {
      id
      created
      createdBy
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteItem($arcql: String!, $clearArrayReferences: Boolean = true) {
    delete(
      type: TodoItem
      arcql: $arcql
      clearArrayReferences: $clearArrayReferences
    )
  }
`;
