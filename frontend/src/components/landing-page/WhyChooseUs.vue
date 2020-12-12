<template>
    <div id="why-choose-us">
        <div class="landing-content">
            <div class="reasons">
                <div id="reason-1">
                    <i class="icon fas fa-code" id="code-icon"></i>
                    <h3>Genial</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-2">
                    <i class="icon fas fa-hands-helping" id="hands-icon"></i>
                    <h3>Zuverlässig</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-3">
                    <i class="icon fas fa-space-shuttle" id="shuttle-icon"></i>
                    <h3>Schnell</h3>
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
#code-icon {
    color: $blue;
}

#hands-icon {
    color: $red;
}

#shuttle-icon {
    color: $grey;
}

.icon {
    margin: auto;
    font-size: 10rem;
    border-radius: 50%;
    height: 250px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lighten($black, 2%);
    box-shadow: 0 0 20px rgba(darken($black, 5%), 0.2);
    margin-bottom: 1.5rem;
}

.reasons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    div {
        flex: 0 0 33.333333%;
        max-width: 300px;
        text-align: center;
        box-sizing: border-box;
        padding: 30px;
        // img {
        //     max-width: 100%;
        //     margin-bottom: 10px;
        // }
    }
}
#why-choose-us {
    background-color: $whyChooseUsBackground;
}
</style>
