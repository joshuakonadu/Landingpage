<template>
    <div id="announcement" v-if="!error">
        <div class="content">
        <h1>Aktuelles (Noch nicht verwaltbar)</h1>
        <div class="content2 row">
            <div class="text-content col-12 col-md-6">
                <h3>Annoucement Name</h3>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id aliquid perferendis, reiciendis aut ad ducimus, vitae at porro facilis
                    temporibus dignissimos omnis voluptatem. Alias accusamus illum velit error at est?
                </p>
                <a href="#">More...</a>
            </div>
            <img class="col-12 col-md-6" src="https://dummyimage.com/800x500/e35454/ed8ebe" alt="test" />
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import * as announcementService from "../../services/announcement.service";
export default {
    name: "Announcements",
    data() {
        return {
            error: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.content2 {
    width: 80%;
    margin: 20px auto;

    .text-content {
        margin-right: 5vw;

        p {
            margin-top: 1em;
            line-height: 1.7;
        }

        a {
            font-size: 1.8em;
            color: $blue;
            text-decoration: none;
            float: right;
        }
    }
    img {
        width: 30vw;
        max-width: 400px;
        height: auto;
        object-fit: cover;

        @media only screen and (max-width: 600px) {
            display: none;
        }
    }
}
#announcement{
    background-color: #D3D4D9;
}
</style>
