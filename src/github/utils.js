const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.substring(1)

const generateMergeFreezeStatus = (name, reason) => {
  return {
    status: 'completed',
    conclusion: 'failure',
    title: `🥶 Frozen By ${capitalize(name)} ${reason ? `- ${reason}` : ''}`,
    output: {
      title: `🥶 Frozen By ${capitalize(name)} ${reason ? `- ${reason}` : ''}`,
      summary: reason || ''
    },
    actions: [{
      label: 'Unfreeze PR',
      description: 'Unfreeze only this Pull Request',
      identifier: 'unfreeze_pr'
    }]
  }
}

const generateMergeUnfreezeStatus = name => {
  return {
    status: 'completed',
    conclusion: 'success',
    title: '☀️ Merge OK',
    output: {
      title: '☀️ Merge OK',
      summary: `Unfreeze by: ${capitalize(name)}`
    }
  }
}

export { generateMergeFreezeStatus, generateMergeUnfreezeStatus }
