<template>
    <div>
        <nav>
            <input type="checkbox" id="check" ref="checkbox" />
            <label for="check" class="menu-btn">
                <i class="fas fa-bars"></i>
            </label>
            <router-link to="/">
                <label class="logo">Logo</label>
            </router-link>
            <ul>
                <!-- maybe extract the routes from a config? -->
                <li><router-link @click.native="collapseNavbar()" :class="{ active: currentPath == '/' }" to="/">Home</router-link></li>
                <!-- <li><router-link @click.native="collapseNavbar()" :class="{ active: currentPath == '/shop' }" to="/shop">Shop</router-link></li> -->
                <li><router-link @click.native="collapseNavbar()" :class="{ active: currentPath == '/aktuelles' }" to="/aktuelles">Aktuelles</router-link></li>
                <li><router-link @click.native="collapseNavbar()" :class="{ active: currentPath == '/galerie' }" to="/galerie">Galerie</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
export default {
    name: "TopNav",
    computed: {
        currentPath() {
            return this.$route.path;
        },
    },
    methods: {
        collapseNavbar() {
            (this.$refs["checkbox"] as HTMLInputElement).checked = false;
        },
    },
};
</script>

<style lang="scss" scoped>
* {
    margin: 0;
}

nav {
    background: darken($black, 5%);
    height: $navbarHeight;
    width: 100%;
    display: flex;

    .logo {
        color: $red;
        font-size: 35px;
        padding-left: 5vw;
        font-weight: bold;
        cursor: pointer;
    }

    ul {
        z-index: 10;
        margin-left: auto;
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        padding-right: 5vw;

        li {
            display: inline-block;
            margin: 0 30px;

            a {
                color: $white;
                position: relative;
                text-transform: uppercase;
                text-decoration: none;

                &:before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    border: 2px white none;
                    bottom: -2px;
                    left: 0;
                    background-color: $white;
                    visibility: hidden;
                    transform: scaleX(0);
                    transition: all 0.3s ease-in-out 0s;
                }

                &:hover::before {
                    visibility: visible;
                    transform: scaleX(1.05);
                }
            }
            .active::before {
                visibility: visible;
                transform: scaleX(1.05);
            }
        }
    }
}

.menu-btn {
    font-size: 30px;
    color: $white;
    cursor: pointer;
    display: none;
    margin: 0;
}

#check {
    display: none;
}

@media (max-width: 750px) {
    .menu-btn {
        display: flex;
        align-items: center;
        padding-left: 20px;
    }
    nav {
        ul {
            &,
            *,
            li > .active::before {
                opacity: 0;
            }

            background: lighten($black, 5%);
            justify-content: center;
            height: 0%;
            position: absolute;
            width: 100%;
            top: $navbarHeight;
            left: 0;
            flex-direction: column;
            text-align: center;
            transition: all 0.5s;
            transition-property: opacity, height;

            li {
                margin-top: 20px;
                position: relative;
                a {
                    font-size: 20px;
                }
            }
        }
    }

    #check:checked ~ ul {
        &,
        *,
        *::before {
            opacity: 1;
        }
        height: 30%;
        justify-content: center;
        li {
            margin: 10px;
        }
    }
}
</style>
