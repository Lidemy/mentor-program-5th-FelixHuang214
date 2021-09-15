const TOKEN_NAME = "token";

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const dataFetchReducer = (state, action) => {
  console.log("dataFetchReducer", state, action);
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return action.payload
        ? {
            ...state,
            isLoading: false,
            isError: false,
            posts: action.payload,
          }
        : {
            ...state,
            isLoading: false,
            isError: false,
          };
    case "FETCH_TARGET_POST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        targetPost: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentPage: action.payload,
      };
    case "SET_LAST_PAGE":
      return {
        ...state,
        isLoading: false,
        isError: false,
        lastPage: action.payload,
      };
    case "NO_LOGIN":
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case "LOGIN":
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: null,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case "ERROR_MESSAGE_INIT":
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
    default:
      throw new Error();
  }
};

export const setPhotoToLocalStorage = (id, storageName, length) => {
  let images = {};
  if (window.localStorage.getItem(storageName)) {
    images = JSON.parse(window.localStorage.getItem(storageName));
  }
  if (images[id]) {
    return images[id];
  }
  if (!images[id]) {
    const randomNumber = Math.floor(Math.random() * length);
    images = {
      ...images,
      [id]: randomNumber,
    };
    window.localStorage.setItem(storageName, JSON.stringify(images));
    return randomNumber;
  }
};

export const getPhotoFromLocalStorage = (id, storageName) => {
  const photo = JSON.parse(window.localStorage.getItem(storageName));
  return photo[id];
};
