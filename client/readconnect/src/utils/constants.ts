export const HOST = process.env.SERVER_URL;
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const BOOK_ROUTES = `${API_URL}/books`;

// Auth
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const SET_USER_INFO = `${AUTH_ROUTES}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTES}/set-user-image`;

//  Books
export const IMAGES_URL = `${HOST}/uploads`;
export const ADD_BOOK_ROUTE = `${BOOK_ROUTES}/add`;
export const GET_USER_BOOKS_ROUTE = `${BOOK_ROUTES}/get-user-books`;
