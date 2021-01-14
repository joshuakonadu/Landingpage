<template>
    <div v-if="!isLoading && announcements.length > 0" id="wrapper">
        <div class="announcement" v-for="announcement in announcements" :key="announcement._id">
            <div class="announcement-content">
                <h3 class="text-break">{{ announcement.title }}</h3>
                <p class="text-break">{{ announcement.description }}</p>
            </div>
            <img :src="`data:image/${announcement.image.format};base64,${announcement.image.imageB64}`" alt="Bild" />
            <span class="timestamp">{{ getDate(announcement.createdAt) }}</span>
        </div>
    </div>
    <div v-else-if="isLoading" class="vh-100">
        <loading-spinner></loading-spinner>
    </div>
    <div class="error-msg vh-100" v-else>
        <h1>Es ist ein Fehler aufgetreten</h1>
    </div>
</template>

<script>
import * as announcementService from "../services/announcement.service";
import { convertISODate } from "../services/date.service";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
    name: "Announcements",
    components: {
        LoadingSpinner,
    },
    data() {
        return {
            announcements: [],
            isLoading: true,
        };
    },
    created() {
        announcementService
            .getAllAnnouncements()
            .then(res => {
                this.announcements = res.data;
                this.isLoading = false;
            })
            .catch(() => (this.isLoading = false));
    },
    methods: {
        getDate(date) {
            return convertISODate(date);
        },
    },
};
</script>

<style lang="scss" scoped>
#wrapper {
    color: $white;
    width: 80%;
    margin: auto;
    min-height: 100vh;
    padding-bottom: 50px;
}

.announcement {
    display: flex;
    padding: 30px 2vw;
    align-items: center;
    position: relative;
    border: 0px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(#000, 0.2);
    background-color: lighten($black, 2%);
    margin-top: 40px;

    .announcement-content {
        margin-left: 0;
        flex-direction: column;
        margin-right: 10px;
        white-space: pre-wrap;
        height: 90%;
    }

    .timestamp {
        position: absolute;
        bottom: 20px;
    }

    img {
        margin-left: auto;
        max-width: 400px;
        -object-fit: cover;
    }

    @media only screen and (max-width: 800px) {
        flex-direction: column;

        img {
            margin-right: auto;
            max-width: 200px;
        }

        .timestamp {
            bottom: 5px;
        }
    }
}

.vh-100 {
    min-height: 100vh;
}
</style>
