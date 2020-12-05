<template>
    <footer class="pt-5 bgC">
        <div class="landing-content d-flex justify-content-space-between flex-wrap flex-row">
            <div class="sec-aboutus mr-3">
                <h4 class="text-white">Über uns</h4>
                <div class="line"></div>
                <p class="colorG pr-5">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia rerum magnam autem provident tenetur voluptatum sapiente nesciunt odit,
                    et velit!
                </p>

                <ul class="sci mt-4 d-flex pl-0">
                    <li>
                        <a href=""><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </div>
            <div class="contact">
                <h4 class="text-white">Kontakt</h4>
                <div class="line"></div>
                <ul class="info pl-0">
                    <li class="d-flex ">
                        <span><i class="fa fa-phone mr-3" aria-hidden="true"></i></span>
                        <p><a href="Tel:1234567">+1 2345 6789 0</a></p>
                    </li>
                    <li class="d-flex ">
                        <span><i class="fa fa-envelope mr-3" aria-hidden="true"></i></span>
                        <p><a href="mailto:example@hh.de">example@hh.de</a></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-white copyRightText d-flex justify-content-center pb-4">
            ©2020 Landingpage | made with <i class="fa fa-heart mx-2" aria-hidden="true" style="color: red"></i> in Hamburg
        </div>
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
.line {
    width: 60px;
    height: 2px;
    border-bottom: solid 3px $red;
    margin-top: -10px;
    margin-bottom: 20px;
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
