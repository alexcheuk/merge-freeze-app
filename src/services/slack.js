import { WebClient } from "@slack/web-api";

const SlackAPI = new WebClient();

export const openConfirmationDialog = async (
  token,
  triggerId,
  reason,
  repos = []
) => {
  return SlackAPI.dialog
    .open({
      token,
      trigger_id: triggerId,
      dialog: {
        callback_id: "confirm_merge_freeze",
        title: "Are you sure?",
        submit_label: "Submit",
        elements: [
          {
            type: "text",
            label: "Reason",
            name: "reason",
            value: reason,
            placeholder: "Reason for Merge Freeze",
            optional: true,
          },
          {
            label: "Repos",
            type: "select",
            name: "repos",
            value: "all",
            options: [
              {
                label: "All",
                value: "all",
              },
              ...repos.map((repoName) => ({
                label: repoName,
                value: repoName,
              })),
            ],
          },
        ],
      },
    })
    .catch((res) => console.log(res));
};

export const openUnfreezePRConfirmationDialog = async (
  token,
  triggerId,
  prId,
  repos
) => {
  return SlackAPI.dialog
    .open({
      token,
      trigger_id: triggerId,
      dialog: {
        callback_id: "confirm_unfreeze_pr_id",
        title: "From which Repository?",
        submit_label: "Submit",
        elements: [
          {
            type: "select",
            label: "Repository",
            name: "repo",
            value: repos[0].full_name,
            placeholder: "Repository",
            options: repos.map((repo) => ({
              label: repo.full_name,
              value: repo.full_name,
            })),
          },
          {
            type: "text",
            label: "PR Number",
            name: "prId",
            value: prId,
            placeholder: "Pull Request #",
          },
        ],
      },
    })
    .catch((res) => console.log(res));
};
