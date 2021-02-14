import axios from 'axios';

let githubToken;

if (process.env.NODE_ENV !== 'production') {
  githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubToken = process.env.GITHUB_TOKEN;
}

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: githubToken },
});

// Search Users
export const searchUsers = async text => {
  // The dispatches have to be done in each individual functions, including setLoading.

  const res = await github.get(`/search/users?q=${text}`);
  return res.data.items;
};

export const getUserAndRepos = async username => {
  // This method returns as an array the results of an array of promises once all of them have been resolved.
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}?`),
    github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`),
  ]);
  return { user: user.data, repos: repos.data };
};

export const getFirstUsers = async () => {
  const firstUsers = await github.get('/users');
  return firstUsers.data;
};
