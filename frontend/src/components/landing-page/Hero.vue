<template>
    <div id="hero">
        <div class="content">
            <h1>Euer IT - Experte am Werk</h1>
            <div class="buttons">
                <button @click="scrollDown" id="contact-btn">Kontakt aufnehmen</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Hero",
    methods: {
        scrollDown() {
            const contactFormElement: HTMLElement | null = document.getElementById("contact-form");
            contactFormElement?.scrollIntoView({ behavior: "smooth" });
        },
    },
};
</script>

<style lang="scss" scoped>
#hero {
    position: relative;
    overflow: hidden;

    &,
    &::before {
        height: calc(80vh - #{$navbarHeight});
    }

    &::before {
        content: "";
        position: absolute;
        transform: scale(1.02);
        width: 100%;
        background: url("../../../public/dna.png");
        background-position: 23%;
        background-repeat: no-repeat;
        background-size: cover;
    }
}

h1 {
    font-weight: 700;
    text-align: center;
    color: $red;
    text-shadow: 2px 2px 3px rgba($black, 0.9);
    margin: 0 15px;
    margin-bottom: auto;
    font-size: 4rem;
    letter-spacing: 0.05em;

    @media (max-width: 600px) {
        font-size: 2.2rem;
    }
}

.content {
    * {
        z-index: 1;
    }
    padding-top: 2vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.buttons {
    padding-top: 10vh;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10vh;
}

button {
    border: none;
    border-radius: 6px;
    margin: 1vh 0;
    padding: 10px;
    color: $grey;
    background: none;
    letter-spacing: 0.05rem;
}

#shop-btn {
    font-size: 1.8rem;
    font-weight: 600;
    width: 250px;
    // below was copy & pasted from https://codepen.io/miraviolet/pen/ZobWEg
    border: solid 2px transparent;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #a11212, #e45050);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 1000px 1px $red inset;

    #click-icon {
        fill: $grey;

        @media (max-width: 600px) {
            display: none;
        }
    }

    @media (min-width: 600px) {
        padding-right: 20px;
    }

    &:hover {
        box-shadow: 2px 1000px 1px darken($red, 5%) inset;
        transition: 0.2s;
    }
}

#contact-btn {
    width: 250px;
    font-weight: 400;
    background-color: rgba(#000, 0.2);

    &:hover {
        background-color: rgba(#000, 0.4);
        transition: 0.2s;
    }
}
</style>
