import { AppConstants, XSRF_TOKEN } from "../constants/constants";
import { NewTaskRequest, UpdateTaskRequest } from "../model/Task";

type LoginRequest = {
    email: string,
    password: string
};

type RequestOptions = {
    method: string,
    body?: any
}

async function makeRequest(url: string, options: RequestOptions) {
    const headers: Headers = new Headers({'Content-Type': 'application/json'});
    const xsrf_token = `; ${document.cookie}`.split(`; ${XSRF_TOKEN}=`).pop()?.split(';')[0];
    if(xsrf_token){
        headers.append('X-XSRF-TOKEN', xsrf_token);
    }
    
    return await fetch(url, {
        method: options.method,
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(options.body)
    });
}

export async function login(loginRequest: LoginRequest) {
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.LOGIN_API_PATH}`, {
        method: 'POST',
        body: loginRequest
    })
}

export async function getUser(){
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.USER_API_PATH}`, {
        method: 'GET'
    })
}

export async function getTasks() {
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.TASKS_API_PATH}`, {
        method: 'GET'
    })
}

export async function logout() {
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.LOGOUT_API_PATH}`, {
        method: 'POST'
    })
}

export async function checkEmailAvailable(email: string) {
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.CHECK_EMAIL_API_PATH}?email=${email}`, {
        method: "GET"
    })
}

export async function register(loginRequest : LoginRequest) {
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.REGISTER_API_PATH}`, {
        method: "POST",
        body: loginRequest
    })
}

export async function postNewTask(taskRequest: NewTaskRequest){
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.ADD_TASK_API_PATH}`, {
        method: "POST",
        body: taskRequest
    })
}

export async function updateTask(taskRequest: UpdateTaskRequest){
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.UPDATE_TASK_API_PATH}`, {
        method: "PUT",
        body: taskRequest
    })
}

export async function deleteTask(taskId: number) {
    return await makeRequest(`${AppConstants.BASE_URL}${AppConstants.DELETE_TASK_API_PATH}?taskId=${taskId}`, {
        method: "DELETE"
    })
}