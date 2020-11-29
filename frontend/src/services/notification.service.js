import { BackendConfig, ApiClient } from "../backend.config";

export function sendNotification(data){
    return ApiClient.post(BackendConfig.notification, data);
}

export function getNotification(data){
    return ApiClient.get(`${BackendConfig.notification}/${data.page}`);
}

export function getUnseen(){
    return ApiClient.get(BackendConfig.notificationUnseen);
}

export function updateNotificationStatus(data){
    return ApiClient.patch(BackendConfig.notification,data);
}

export function deleteNotification(data){
    return ApiClient.delete(`${BackendConfig.notification}/${data.id}`);
}