const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_ISSUER_URL_PROD,
      applicationID: 'convex',
    },
  ],
}

export default authConfig
