import { BackendConfig, ApiClient } from "../backend.config";

export function getProducts() {
    return ApiClient.get(BackendConfig.product);
}