module.exports = async (github, context, core, title, body, labels) => {
  const { data: issues } = await github.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: 'all',
      labels: labels
  })

  if (issues.find(x => x.title === title.toString() && x.body === body.toString())) {
    core.warning(`Issue ${title} already exists`)
    return
  }

  if (process.env.GITHUB_ACTOR === 'nektos/act') {
    core.info(`Would create issue '${title}' with content '${body}'`)
  } else {
    await github.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: title,
      body: body,
      labels: labels.split(',')
    })
  }
}