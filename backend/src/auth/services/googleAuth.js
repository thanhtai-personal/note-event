
// import metadata from 'gcp-metadata'
// import { OAuth2Client } from 'google-auth-library'

// // Cache externally fetched information for future invocations
// let aud

// const oAuth2Client = new OAuth2Client()

// async function audience() {
//   if (!aud && (await metadata.isAvailable())) {
//     let project_number = await metadata.project('numeric-project-id')
//     let project_id = await metadata.project('project-id')

//     aud = '/projects/' + project_number + '/apps/' + project_id
//   }

//   return aud
// }

// export async function validateAssertion(assertion) {
//   if (!assertion) {
//     return {}
//   }

//   // Check that the assertion's audience matches ours
//   const aud = await audience()

//   // Fetch the current certificates and verify the signature on the assertion
//   const response = await oAuth2Client.getIapPublicKeys()
//   const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
//     assertion,
//     response.pubkeys,
//     aud,
//     ['https://cloud.google.com/iap']
//   )
//   const payload = ticket.getPayload()

//   // Return the two relevant pieces of information
//   return {
//     email: payload.email,
//     sub: payload.sub,
//   }
// }