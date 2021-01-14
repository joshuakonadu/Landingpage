<template>
    <footer class="pt-5 bgC pb-3">
        <div class="landing-content d-flex justify-content-space-between flex-wrap flex-row">
            <div class="sec-aboutus mr-3">
                <h4 class="text-white">Über mich</h4>
                <p class="colorG pr-5">
                    Ihr habt Fragen? Dann ruft mich gerne an oder schreibt mir eine Email. Folgt mir auf Facebook und Instagram und bleibt auf dem Laufenden!
                </p>

                <ul class="sci mt-4 d-flex pl-0">
                    <li>
                        <a href="#" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="#" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </div>
            <div class="contact">
                <h4 class="text-white">Kontakt</h4>
                <ul class="info pl-0">
                    <li class="d-flex ">
                        <span><i class="fa fa-phone mr-3" aria-hidden="true"></i></span>
                        <p><a href="Tel:+491724117899">+49 172 / 411 78 99</a></p>
                    </li>
                    <li class="d-flex ">
                        <span><i class="fa fa-envelope mr-3" aria-hidden="true"></i></span>
                        <p><a href="mailto:kontakt@landingpage.de">kontakt@landingpage.de</a></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-white copyRightText d-flex justify-content-center pb-4">
            © 2020 landingpage | made with <i class="fa fa-heart mx-2" aria-hidden="true" style="color: red"></i> in Hamburg
        </div>
        <small class="text-muted d-flex justify-content-center">
            <router-link class="text-muted mr-1" tag="a" to="/impressum">Impressum</router-link> |
            <router-link class="text-muted ml-1" tag="a" to="/datenschutz">Datenschutz</router-link>
        </small>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sec-aboutus {
    width: 100%;
}
@media (min-width: 700px) {
    .sec-aboutus {
        width: 40%;
    }
}
h4 {
    font-weight: 500;
    margin-bottom: 15px;
}
h4::after {
    content: "";
    margin-top: 5px;
    display: block;
    width: 60px;
    height: 2px;
    border-bottom: solid 3px $red;
}
.bgC {
    background-color: $footerColor;
}
.colorG {
    color: $grey;
}
.sci li {
    list-style: none;
    a {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: #222;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        text-decoration: none;
        border-radius: 4px;
    }
    a:hover {
        background: $red;
    }
}

.fa {
    color: #fff;
    font-size: 20px;
}
.contact {
    a {
        color: $grey;
        text-decoration: none;
    }
}
</style>
