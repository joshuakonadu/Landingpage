import * as notificationService from "@/services/notification.service";
import * as productService from "@/services/product.service";


export default {
    namespaced: true,
    state: {
        products: []
    },
    actions: {
        sendNotification(_, data) {
            notificationService.sendNotification(data)
                .then(() => {
                    return ''
                })
                .catch(err => {
                    throw new Error(err)
                })
        },
        getProducts({ commit }) {
            productService.getProducts()
                .then((products) => {
                    commit('getProductsSuccess', products.data)
                })
        }

    },
    mutations: {
        getProductsSuccess(state, products) {
            state.products = products;
        }
    },
};