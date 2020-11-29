<template>
    <div id="why-choose-us">
        <div class="content">
            <h1>
                Warum uns?
            </h1>
            <div class="reasons row mb-5">
                <div id="reason-1" class="col-12 col-md-4 mb-5 mb-md-0">
                    <img src="https://dummyimage.com/600x400/f534f5/fff" />
                    <h3>Reason 1</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-2" class="col-12 col-md-4 mb-5 mb-md-0">
                    <img src="https://dummyimage.com/600x400/2fb4e0/fff" />
                    <h3>Reason 2</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-3" class="col-12 col-md-4 mb-5 mb-md-0">
                    <img src="https://dummyimage.com/600x400/40dba5/fff" />
                    <h3>Reason 3</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "WhyChooseUs",
};
</script>

<style lang="scss" scoped>
.reasons {

    div {
        text-align: center;
        img {
            max-width: 100%;
            margin-bottom: 10px;
        }
    }
}
#why-choose-us {
    background-color: $black;
}
</style>
