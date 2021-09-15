import { getAuthToken } from "./utils";
const BASE_URL = "https://student-json-api.lidemy.me";

// 未實做完全，會試著配合 search 來使用
export const getPosts = (
  page,
  author = "",
  sort = "createdAt",
  order = "desc"
) => {
  return fetch(
    `${BASE_URL}/posts?_sort=${sort}&_order=${order}&author=${author}&_expand=user&_page=${page}&_limit=6`
  ).then((res) => res.json());
};

export const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts`).then((res) => res.json());
};

export const getTargetPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}&_expand=user`).then((res) =>
    res.json()
  );
};

export const getPostsByAuthor = (author) => {
  return fetch(`${BASE_URL}/posts?author=${author}&_expand=user&_limit=6`).then(
    (res) => res.json()
  );
};

export const addPost = ({ title, content }) => {
  const token = getAuthToken("token");
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => res.json());
};

export const login = ({ username, password }) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const register = ({ username, password, nickname }) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      nickname,
    }),
  }).then((res) => res.json());
};

export const getUser = () => {
  const token = getAuthToken("token");
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
