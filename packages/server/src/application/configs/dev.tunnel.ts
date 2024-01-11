import SmeeClient from 'smee-client'

export default () => {
  const GithubEventsTunnel = new SmeeClient({
    source: 'https://smee.io/mf-github-events',
    target: `http://${process.env.SERVER_BASE_URL}/github/events`,
    logger: console,
  })

  GithubEventsTunnel.start()
}
