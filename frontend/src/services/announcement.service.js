import { BackendConfig, ApiClient } from "../backend.config";

export function getLatestAnnouncement() {
    return ApiClient.get(BackendConfig.latestAnnouncement)
}

export function getAllAnnouncements() {
    return ApiClient.get(BackendConfig.announcements)
}

export function addAnnouncement(data) {
    return ApiClient.post(BackendConfig.announcements, data)
}

export function updateAnnouncement(data) {
    return ApiClient.patch(BackendConfig.announcements, data)
}

export function deleteAnnouncement(data) {
    return ApiClient.delete(`${BackendConfig.announcements}/${data.id}`)
}
