const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.substring(1)

export const buildUnfrozenGithubCheck = ({
  requesterName,
  reason,
}: {
  requesterName: string
  reason: string
}): {
  conclusion: 'failure' | 'success'
  title: string
  summary?: string
  details?: string
} => {
  return {
    conclusion: 'success',
    title: `☀️ Merge OK`,
    summary: `Unfrozen by: ${capitalize(requesterName)}`,
  }
}
