import { getGithubAppAccessToken } from "./src/utils/helpers.js";
import webhooksHandler from "./src/v1/app/controllers/webhooksHandler.js";
import { getAPI, postAPI } from "./src/v1/app/services/api/axios.js";

let uninstall = {
  action: "deleted",
  installation: {
    id: 59168743,
    client_id: "Iv23licc2XzMwed367Xv",
    account: {
      login: "abudaudhossain",
      id: 73416372,
      node_id: "MDQ6VXNlcjczNDE2Mzcy",
      avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/abudaudhossain",
      html_url: "https://github.com/abudaudhossain",
      followers_url: "https://api.github.com/users/abudaudhossain/followers",
      following_url:
        "https://api.github.com/users/abudaudhossain/following{/other_user}",
      gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/abudaudhossain/subscriptions",
      organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
      repos_url: "https://api.github.com/users/abudaudhossain/repos",
      events_url:
        "https://api.github.com/users/abudaudhossain/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/abudaudhossain/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    repository_selection: "selected",
    access_tokens_url:
      "https://api.github.com/app/installations/59168743/access_tokens",
    repositories_url: "https://api.github.com/installation/repositories",
    html_url: "https://github.com/settings/installations/59168743",
    app_id: 1094070,
    app_slug: "git-repo-report",
    target_id: 73416372,
    target_type: "User",
    permissions: {
      issues: "read",
      contents: "read",
      metadata: "read",
      statuses: "read",
      merge_queues: "read",
    },
    events: [],
    created_at: "2025-01-05T10:50:43.000+06:00",
    updated_at: "2025-01-12T15:43:03.000+06:00",
    single_file_name: null,
    has_multiple_single_files: false,
    single_file_paths: [],
    suspended_by: null,
    suspended_at: null,
  },
  repositories: [
    {
      id: 432955687,
      node_id: "R_kgDOGc5hJw",
      name: "abudaud.web.app",
      full_name: "abudaudhossain/abudaud.web.app",
      private: true,
    },
    {
      id: 715428466,
      node_id: "R_kgDOKqSScg",
      name: "abudaud.dev",
      full_name: "abudaudhossain/abudaud.dev",
      private: true,
    },
  ],
  sender: {
    login: "abudaudhossain",
    id: 73416372,
    node_id: "MDQ6VXNlcjczNDE2Mzcy",
    avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/abudaudhossain",
    html_url: "https://github.com/abudaudhossain",
    followers_url: "https://api.github.com/users/abudaudhossain/followers",
    following_url:
      "https://api.github.com/users/abudaudhossain/following{/other_user}",
    gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/abudaudhossain/subscriptions",
    organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
    repos_url: "https://api.github.com/users/abudaudhossain/repos",
    events_url: "https://api.github.com/users/abudaudhossain/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/abudaudhossain/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
};

let install = {
  action: "created",
  installation: {
    id: 59473321,
    client_id: "Iv23licc2XzMwed367Xv",
    account: {
      login: "abudaudhossain",
      id: 73416372,
      node_id: "MDQ6VXNlcjczNDE2Mzcy",
      avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/abudaudhossain",
      html_url: "https://github.com/abudaudhossain",
      followers_url: "https://api.github.com/users/abudaudhossain/followers",
      following_url:
        "https://api.github.com/users/abudaudhossain/following{/other_user}",
      gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/abudaudhossain/subscriptions",
      organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
      repos_url: "https://api.github.com/users/abudaudhossain/repos",
      events_url:
        "https://api.github.com/users/abudaudhossain/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/abudaudhossain/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    repository_selection: "selected",
    access_tokens_url:
      "https://api.github.com/app/installations/59473321/access_tokens",
    repositories_url: "https://api.github.com/installation/repositories",
    html_url: "https://github.com/settings/installations/59473321",
    app_id: 1094070,
    app_slug: "git-repo-report",
    target_id: 73416372,
    target_type: "User",
    permissions: {
      contents: "read",
      issues: "read",
      merge_queues: "read",
      metadata: "read",
      statuses: "read",
    },
    events: [],
    created_at: "2025-01-12T15:50:24.000+06:00",
    updated_at: "2025-01-12T15:50:24.000+06:00",
    single_file_name: null,
    has_multiple_single_files: false,
    single_file_paths: [],
    suspended_by: null,
    suspended_at: null,
  },
  repositories: [
    {
      id: 432069099,
      node_id: "R_kgDOGcDZ6w",
      name: "-Internship-at-Sohopathi",
      full_name: "abudaudhossain/-Internship-at-Sohopathi",
      private: false,
    },
  ],
  requester: null,
  sender: {
    login: "abudaudhossain",
    id: 73416372,
    node_id: "MDQ6VXNlcjczNDE2Mzcy",
    avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/abudaudhossain",
    html_url: "https://github.com/abudaudhossain",
    followers_url: "https://api.github.com/users/abudaudhossain/followers",
    following_url:
      "https://api.github.com/users/abudaudhossain/following{/other_user}",
    gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/abudaudhossain/subscriptions",
    organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
    repos_url: "https://api.github.com/users/abudaudhossain/repos",
    events_url: "https://api.github.com/users/abudaudhossain/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/abudaudhossain/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
};

let selectedRepo = {
  action: "added",
  installation: {
    id: 59473321,
    client_id: "Iv23licc2XzMwed367Xv",
    account: {
      login: "abudaudhossain",
      id: 73416372,
      node_id: "MDQ6VXNlcjczNDE2Mzcy",
      avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/abudaudhossain",
      html_url: "https://github.com/abudaudhossain",
      followers_url: "https://api.github.com/users/abudaudhossain/followers",
      following_url:
        "https://api.github.com/users/abudaudhossain/following{/other_user}",
      gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/abudaudhossain/subscriptions",
      organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
      repos_url: "https://api.github.com/users/abudaudhossain/repos",
      events_url:
        "https://api.github.com/users/abudaudhossain/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/abudaudhossain/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    repository_selection: "selected",
    access_tokens_url:
      "https://api.github.com/app/installations/59473321/access_tokens",
    repositories_url: "https://api.github.com/installation/repositories",
    html_url: "https://github.com/settings/installations/59473321",
    app_id: 1094070,
    app_slug: "git-repo-report",
    target_id: 73416372,
    target_type: "User",
    permissions: {
      contents: "read",
      issues: "read",
      merge_queues: "read",
      metadata: "read",
      statuses: "read",
    },
    events: [],
    created_at: "2025-01-12T15:50:24.000+06:00",
    updated_at: "2025-01-12T15:51:30.000+06:00",
    single_file_name: null,
    has_multiple_single_files: false,
    single_file_paths: [],
    suspended_by: null,
    suspended_at: null,
  },
  repository_selection: "selected",
  repositories_added: [
    {
      id: 715428466,
      node_id: "R_kgDOKqSScg",
      name: "abudaud.dev",
      full_name: "abudaudhossain/abudaud.dev",
      private: true,
    },
  ],
  repositories_removed: [],
  requester: null,
  sender: {
    login: "abudaudhossain",
    id: 73416372,
    node_id: "MDQ6VXNlcjczNDE2Mzcy",
    avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/abudaudhossain",
    html_url: "https://github.com/abudaudhossain",
    followers_url: "https://api.github.com/users/abudaudhossain/followers",
    following_url:
      "https://api.github.com/users/abudaudhossain/following{/other_user}",
    gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/abudaudhossain/subscriptions",
    organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
    repos_url: "https://api.github.com/users/abudaudhossain/repos",
    events_url: "https://api.github.com/users/abudaudhossain/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/abudaudhossain/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
};

let removeRepo = {
  action: "removed",
  installation: {
    id: 59473321,
    client_id: "Iv23licc2XzMwed367Xv",
    account: {
      login: "abudaudhossain",
      id: 73416372,
      node_id: "MDQ6VXNlcjczNDE2Mzcy",
      avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/abudaudhossain",
      html_url: "https://github.com/abudaudhossain",
      followers_url: "https://api.github.com/users/abudaudhossain/followers",
      following_url:
        "https://api.github.com/users/abudaudhossain/following{/other_user}",
      gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/abudaudhossain/subscriptions",
      organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
      repos_url: "https://api.github.com/users/abudaudhossain/repos",
      events_url:
        "https://api.github.com/users/abudaudhossain/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/abudaudhossain/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    repository_selection: "selected",
    access_tokens_url:
      "https://api.github.com/app/installations/59473321/access_tokens",
    repositories_url: "https://api.github.com/installation/repositories",
    html_url: "https://github.com/settings/installations/59473321",
    app_id: 1094070,
    app_slug: "git-repo-report",
    target_id: 73416372,
    target_type: "User",
    permissions: {
      contents: "read",
      issues: "read",
      merge_queues: "read",
      metadata: "read",
      statuses: "read",
    },
    events: [],
    created_at: "2025-01-12T15:50:24.000+06:00",
    updated_at: "2025-01-12T15:52:29.000+06:00",
    single_file_name: null,
    has_multiple_single_files: false,
    single_file_paths: [],
    suspended_by: null,
    suspended_at: null,
  },
  repository_selection: "selected",
  repositories_added: [],
  repositories_removed: [
    {
      id: 432069099,
      node_id: "R_kgDOGcDZ6w",
      name: "-Internship-at-Sohopathi",
      full_name: "abudaudhossain/-Internship-at-Sohopathi",
      private: false,
    },
  ],
  requester: null,
  sender: {
    login: "abudaudhossain",
    id: 73416372,
    node_id: "MDQ6VXNlcjczNDE2Mzcy",
    avatar_url: "https://avatars.githubusercontent.com/u/73416372?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/abudaudhossain",
    html_url: "https://github.com/abudaudhossain",
    followers_url: "https://api.github.com/users/abudaudhossain/followers",
    following_url:
      "https://api.github.com/users/abudaudhossain/following{/other_user}",
    gists_url: "https://api.github.com/users/abudaudhossain/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/abudaudhossain/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/abudaudhossain/subscriptions",
    organizations_url: "https://api.github.com/users/abudaudhossain/orgs",
    repos_url: "https://api.github.com/users/abudaudhossain/repos",
    events_url: "https://api.github.com/users/abudaudhossain/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/abudaudhossain/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
};

// webhooksHandler(selectedRepo);
console.log("testing");
let test = async () => {
  //  let t =getGithubAppAccessToken();
  // let result = await postAPI(
  //   "app/installations/59473321/access_tokens",
  //   { test: "test" },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${t}`,
  //     },
  //   }
  // );
  // console.log(result);
  console.log("test end");
};

test();
