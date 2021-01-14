<template>
    <div id="why-choose-us">
        <div class="landing-content">
            <div class="reasons">
                <div id="reason-1">
                    <i class="icon fas fa-anchor" id="anchor-icon"></i>
                    <h3>Maritim</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-2">
                    <i class="icon fas fa-hands-heart" id="hands-icon"></i>
                    <h3>Handgemacht</h3>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque labore a magnam, pariatur accusamus quo quisquam doloremque harum ipsam
                        officiis?
                    </span>
                </div>
                <div id="reason-3">
                    <i class="icon fas fa-seedling" id="seed-icon"></i>
                    <h3>Nachhaltig</h3>
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
#anchor-icon {
    color: $blue;
}

#hands-icon {
    color: $red;
}

#seed-icon {
    color: #8cf780;
}

.icon {
    margin: auto;
    font-size: 10rem;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lighten($black, 5%);
    box-shadow: 0 0 20px rgba(darken(#111, 5%), 0.7);
    margin-bottom: 1.5rem;

    &::before {
        transform: scale(0.3);
    }
}

.reasons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    div {
        max-width: 30%;
        text-align: center;
        padding: 0 20px;
    }

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;

        div {
            &:not(:first-of-type) {
                margin-top: 3rem;
            }
            max-width: 100%;
        }
    }
}

h3 {
    word-wrap: break-word;
}
#why-choose-us {
    background-color: $whyChooseUsBackground;
}
</style>
