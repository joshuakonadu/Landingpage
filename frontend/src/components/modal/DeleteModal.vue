<template>
    <stack-modal
        :show="show"
        title="Löschen?"
        @close="$emit('reset')"
        @save="$emit('confirm', id, index)"
        transition="translate-fade"
        :saveButton="{ title: 'Ja', btnClass: { 'btn btn-outline-success': true } }"
        :cancelButton="{ title: 'Abbrechen', btnClass: { 'btn btn-outline-danger': true } }"
    >
        {{ text }}
        <div class="minH"></div>
    </stack-modal>
</template>

<script>
import StackModal from "@innologica/vue-stackable-modal";
export default {
    name: "DeleteModal",
    components: { StackModal },
    props: ["text", "id", "show", "index"],
    methods: {
        close() {
            console.log("close");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@innologica/vue-stackable-modal/src/assets/transitions/translate-fade.scss";
</style>
