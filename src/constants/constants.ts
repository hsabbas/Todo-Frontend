export const AppConstants = {
    REGISTER_API_PATH: "/register",
    LOGIN_API_PATH: "/login",
    LOGOUT_API_PATH: "/logout",
    TASKS_API_PATH: "/tasks",
    USER_API_PATH: "/user",
    CHECK_EMAIL_API_PATH: "/checkEmail",
    ADD_TASK_API_PATH: "/addTask",
    UPDATE_TASK_API_PATH: "/updateTask",
    DELETE_TASK_API_PATH: "/deleteTask",
    BASE_URL: 'http://localhost:8080'
}

export const XSRF_TOKEN = "XSRF-TOKEN";
export const JWT_TOKEN_HEADER = "Authorization";
export const JWT_TOKEN = "jwt-token";
export const EMAIL_MAX_LENGTH = 255;
export const PWD_MAX_LENGTH = 200;
export const PWD_MIN_LENGTH = 6;
export const TASK_NAME_MAX_LENGTH = 100;
export const TASK_DESC_MAX_LENGTH = 400;