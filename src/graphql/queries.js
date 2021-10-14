/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDoge = /* GraphQL */ `
  query GetDoge($id: ID!) {
    getDoge(id: $id) {
      id
      price
      createdAt
      updatedAt
    }
  }
`;
export const listDoges = /* GraphQL */ `
  query ListDoges(
    $filter: ModelDogeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
