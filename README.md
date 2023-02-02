- [Get Started](#get-started)
  - [Apps](#apps)
    - [Production](#production)
    - [Development](#development)
  - [How to run locally](#how-to-run-locally)
    - [Environment Variables (.env)](#environment-variables-env)

# Get Started

## Apps

### Production
- Github App - https://github.com/settings/apps/freeze-merge
- Slack App - https://api.slack.com/apps/ATEP701T3

### Development
- Github App - https://github.com/apps/merge-freeze-test
- Slack App - https://api.slack.com/apps/A04MMDAJ9PC

## How to run locally
### Environment Variables (.env)

| Variable              | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| SLACK_SIGNING_SECRET  | Slack App > Basic Information > App Credentials                                   |
| SLACK_CLIENT_ID       | Slack App > Basic Information > App Credentials                                   |
| SLACK_CLIENT_SECRET   | Slack App > Basic Information > App Credentials                                   |
| GITHUB_APP_IDENTIFIER | Github App > General > About > App ID                                             |
| GITHUB_CLIENT_ID      | Github App > General > About > Client ID                                          |
| GITHUB_CLIENT_SECRET  | Github App > General > Client Secret                                              |
| GITHUB_SIGNING_SECRET |                                                                                   |
| PRIVATE_KEY           | Github App > General > Private keys                                               |
| ALLOWED_CHANNELS      | Slack channel names that is allow to call Merge Freeze commands. Comma separated. |
| MONGO_DB_URL          |                                                                                   |


