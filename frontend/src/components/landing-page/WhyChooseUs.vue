<template>
    <div id="why-choose-us">
        <div class="content">
            <h1>
                Warum uns?
            </h1>
            <div class="reasons">
                <div id="reason-1">
                    <img src="https://dummyimage.com/600x400/f534f5/fff" />
                    <h3>Reason 1</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-2">
                    <img src="https://dummyimage.com/600x400/2fb4e0/fff" />
                    <h3>Reason 2</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-3">
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    div {
        max-width: 400px;
        text-align: center;
        margin: 30px;
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
