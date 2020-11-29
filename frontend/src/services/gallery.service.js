import { BackendConfig, ApiClient } from "../backend.config";

export function getGalleryImages() {
    return ApiClient.get(BackendConfig.gallery);
}

export function addGalleryImage(data) {
    return ApiClient.post(BackendConfig.gallery, data);
}

export function deleteGalleryImage(id) {
    return ApiClient.delete(`${BackendConfig.gallery}/${id}`);
}

export function getGalleryImagesLimit() {
    return ApiClient.get(BackendConfig.galleryLimit);
}

export function updateImageTitle(data) {
    return ApiClient.patch(BackendConfig.gallery, data);
}
