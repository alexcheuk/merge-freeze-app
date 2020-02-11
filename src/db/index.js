export const getGithubRepo = async () => {
  const owner = process.env.REPO_OWNER
  const repo = process.env.REPO_NAME

  return {
    owner,
    repo
  }
}
