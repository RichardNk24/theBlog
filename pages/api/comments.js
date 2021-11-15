// Hello My name is Richard Nkulu and this is an EndPoint that I am creating in order to POST the data to GraphCMS
import { GraphQLClient, gql } from "graphql-request"



const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphcmsToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req, res) {
  console.log({graphcmsToken})
  // GraphQL Client to be able to post data

  const {name, email, slug, comment} = req.body
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    } 
  })

  const query = gql `
    mutation CreateComment ($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
    }
  `
    try {
      const result= await graphQLClient.request(query, req.body)

      return res.status(200).send(result)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
    
}
