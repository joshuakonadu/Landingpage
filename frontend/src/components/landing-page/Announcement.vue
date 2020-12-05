<template>
    <div id="announcement" v-if="!error && announcement && announcement.title">
        <div class="landing-content">
            <h1 class="section-headline">Aktuelles</h1>
            <div class="content">
                <div class="row">
                <div class="col-md-6">
                    <h3 class="text-break">{{ announcement.title }}</h3>
                    <p class="text-break">
                        {{ announcement.description }}
                    </p>
                    <span class="timestamp mr-3">{{ getDate(announcement.createdAt) }}</span>
                    <router-link to="/aktuelles">Mehr...</router-link>
                </div>
                <img class="col-12 col-md-6 mt-3 mt-md-0" :src="`data:image/${announcement.image.format};base64, ${announcement.image.imageB64}`" alt="Aktuelles Bild" />
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as announcementService from "../../services/announcement.service";
import { convertISODate } from "../../services/date.service";

export default {
    name: "Announcements",
    data() {
        return {
            announcement: { title: null, description: null, createdAt: null, image: { imageB64: null, format: null } },
            error: false,
        };
    },
    created() {
        announcementService
            .getLatestAnnouncement()
            .then(res => {
                this.announcement = res.data;
            })
            .catch(() => (this.error = true));
    },
    methods: {
        getDate(date) {
            return convertISODate(date);
        },
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 80%;
    margin: 20px auto;
    display: flex;
    flex-direction: row;

    .text-content {
        margin-right: 5vw;

        h3 {
            font-size: 2.5em;
        }

        p {
            margin-top: 1em;
            line-height: 1.7;
            font-size: 1.5em;
        }

        a {
            margin-left: 20px;
            font-size: 1.8em;
            color: $blue;
            text-decoration: none;
            float: right;
        }
    }
    img {
        margin-left: auto;
        width: 30vw;
        max-width: 400px;
        height: auto;
        object-fit: cover;

        @media only screen and (max-width: 600px) {
            display: none;
        }
    }

    .timestamp {
        color: rgba(#fff, 0.5);
        font-size: 0.8em;
    }
}
#announcement {
    background-color: $announcementBackground;
}
</style>
