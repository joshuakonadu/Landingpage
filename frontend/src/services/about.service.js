import { BackendConfig, ApiClient } from "../backend.config";

export function getAbout() {
    return ApiClient.get(BackendConfig.about);
}

export function addAbout(data) {
    return ApiClient.post(BackendConfig.about, data);
}
