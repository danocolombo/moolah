/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createInstitution = /* GraphQL */ `
  mutation CreateInstitution(
    $input: CreateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    createInstitution(input: $input, condition: $condition) {
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
export const updateInstitution = /* GraphQL */ `
  mutation UpdateInstitution(
    $input: UpdateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    updateInstitution(input: $input, condition: $condition) {
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
export const deleteInstitution = /* GraphQL */ `
  mutation DeleteInstitution(
    $input: DeleteInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    deleteInstitution(input: $input, condition: $condition) {
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
