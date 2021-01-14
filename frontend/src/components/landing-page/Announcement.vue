<template>
    <div id="announcement" v-if="announcement.title != null && !error">
        <div class="landing-content">
            <div class="content">
                <div class="text-content">
                    <h3 class="text-break">{{ announcement.title }}</h3>
                    <p class="text-break">{{ announcement.description }}</p>
                    <span class="timestamp">{{ getDate(announcement.createdAt) }}</span>
                    <router-link to="/aktuelles">Mehr...</router-link>
                </div>
                <img class="size mt-5" :src="`data:image/${announcement.image.format};base64, ${announcement.image.imageB64}`" alt="Aktuelles Bild" />
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
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    padding: 3vw;
    box-shadow: 0 0 20px rgba(#222, 0.1);
    background-color: lighten($announcementBackground, 2%);

    .text-content {
        margin-right: 5vw;

        p {
            margin-top: 1em;
            line-height: 1.7;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 10;
            -webkit-box-orient: vertical;
            white-space: pre-wrap;
        }

        a {
            margin-left: 20px;
            color: $blue;
            text-decoration: none;
            float: right;
        }
    }
    img {
        margin-left: auto;
        max-width: 300px;
        max-height: 300px;
        object-fit: cover;

        @media only screen and (max-width: 600px) {
            display: none;
        }
    }
}

#announcement {
    background-color: $announcementBackground;
}
</style>
