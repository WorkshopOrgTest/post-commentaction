const core = require("@actions/core")
const github = require("@actions/github")

async function main() {
  try {
    const githubToken = core.getInput("github-token", { required: false })
    const issueNumber = core.getInput("issue-number", { required: true })
    const owner = core.getInput("owner", { required: false })
    const repository = core.getInput("repository", { required: false })
    const body = core.getInput("body")

    const client = github.getOctokit(githubToken)

    core.info(`==> Posting a comment on issue #${issueNumber}`)

    await client.rest.issues.createComment({
      owner: owner,
      repo: repository,
      issue_number: issueNumber,
      body: body,
    })

    core.setOutput("finish-time", new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
