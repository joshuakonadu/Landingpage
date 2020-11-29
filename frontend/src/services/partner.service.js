import { BackendConfig, ApiClient } from "../backend.config";

export function getPartners() {
    return ApiClient.get(BackendConfig.partners);
}

export function addPartners(data) {
    return ApiClient.post(BackendConfig.partners, data);
}

export function deletePartner(id) {
    return ApiClient.delete(`${BackendConfig.partners}/${id}`);
}

export function updatePartner(data){
    return ApiClient.patch(BackendConfig.partners, data);
}
