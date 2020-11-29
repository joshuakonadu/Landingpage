<template>
    <div id="hero">
        <div class="content">
            <h1>HEADLINE</h1>
            <h3>SUBHEADLINE</h3>
            <div class="buttons">
                <!-- <button id="shop-btn">Zum Shop</button> -->
                <a href="#contact-formular" id="contact-btn">Kontakt aufnehmen</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Hero",
};
</script>

<style lang="scss" scoped>
#hero {
    width: 100%;
    height: calc(100vh - #{$navbarHeight});
    background: url("https://images.pexels.com/photos/258642/pexels-photo-258642.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

h1 {
    font-size: 5em;
    color: $black;
}

h3 {
    color: $black;
}

.content {
    padding-top: 10vh;
    height: 100vh;
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
}

button {
    border: none;
    border-radius: 6px;
    margin: 1vh 0;
    padding: 15px 30px;
    background: $red;
    color: $grey;
}

a{
   border: none;
    border-radius: 6px;
    margin: 1vh 0;
    padding: 15px 30px;
    background: $red;
    color: $grey; 
}

#shop-btn {
    font-size: 1.8em;
    font-weight: 600;
    width: 300px;
    // below was copy & pasted from https://codepen.io/miraviolet/pen/ZobWEg
    border: solid 2px transparent;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #f39447, #f3eb9f);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 1000px 1px $red inset;
}

#contact-btn {
    width: 250px;
    font-size: 1.1em;
    font-weight: 400;
}

@media only screen and (max-width: 500px) {
    h1 {
        font-size: 4em;
    }
}
</style>
