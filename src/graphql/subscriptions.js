/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onCreateAccount(filter: $filter) {
      id
      title
      accountNumber
      balance
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onUpdateAccount(filter: $filter) {
      id
      title
      accountNumber
      balance
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
    onDeleteAccount(filter: $filter) {
      id
      title
      accountNumber
      balance
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInstitution = /* GraphQL */ `
  subscription OnCreateInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
  ) {
    onCreateInstitution(filter: $filter) {
      id
      name
      street
      city
      stateProv
      postalCode
      phone
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInstitution = /* GraphQL */ `
  subscription OnUpdateInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
  ) {
    onUpdateInstitution(filter: $filter) {
      id
      name
      street
      city
      stateProv
      postalCode
      phone
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInstitution = /* GraphQL */ `
  subscription OnDeleteInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
  ) {
    onDeleteInstitution(filter: $filter) {
      id
      name
      street
      city
      stateProv
      postalCode
      phone
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
