export const getAccessTokenMutation = params => {
  return `mutation {
    customerAccessTokenCreate(input: {
      email: ${JSON.stringify(params.email)},
      password: ${JSON.stringify(params.password)}
    }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }`
}

export const getCustomerQuery = accessToken => {
  return `query {
    customer(customerAccessToken: ${JSON.stringify(accessToken)}) {
      id
      firstName
      lastName
      email
    }
  }`
}
