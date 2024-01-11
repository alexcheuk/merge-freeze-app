const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.substring(1)

export const buildFrozenGithubCheck = ({
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
  actions: {
    label: string
    description: string
    identifier: string
  }[]
} => {
  return {
    conclusion: 'failure',
    title: `🥶 Frozen By ${capitalize(requesterName)} ${
      reason ? `- ${reason}` : ''
    }`,
    summary: reason || '',
    actions: [
      {
        label: 'Unfreeze PR',
        description: 'Unfreeze only this Pull Request',
        identifier: 'unfreeze_pr',
      },
    ],
  }
}
