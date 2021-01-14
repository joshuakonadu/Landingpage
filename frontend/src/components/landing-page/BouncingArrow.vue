<template>
    <div class="bouncing-arrow"></div>
</template>

<script>
export default {
    name: "BouncingArrow",
};
</script>

<style scoped>
.bouncing-arrow {
    position: relative;
    bottom: -30px;
    left: calc(50% - 25px);
    margin-top: 3rem;
    width: 50px;
    height: 30px;

    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAyCAYAAADLLVz8AAABzklEQVRoge2VPY7CQBSDRxR0FByACu7CXbgxHSUiIAQiE2lHkbfZRYAS8mfPC2i+GvnZHwk41wAeaPrst0DbjApCCGtSz9ERQlhXbe4VVhX0wILc3RwAi3eDu4a1YSbaEh0AszaD24Z1YSneJgfAssvgprA+rCJtpQNg1WdwXdgQ5pG3DwbAfMjg17DBGHnoDW0zI+gp8AOgbmaG/TGxFlQHgAl7rEIgAEytZb0CYKoY6rbb7UYSPDIUG3e73cY551yWZWfFAWNndxTbjsfj+enIfr9X3DGXqNh0OByqd2VZprhnJlGx5XQ6vd9zuVwUd6NLVGy4Xq/tdnjvg6KA2NkdRfeiKH46lcjzXNFDLlHR2Xvfr/ftdlP0kUlUdM3zfFhf772iF12iomNRFJyeIUh+EmkSFd1CCNwvWVESGC5xrL0qKctyVGUVXcqy1P7RjeV1VnSgv7Z1WD+JitvyJy/GCKBZotVdCbHHxL4XhVijYt0xQT1OnT8KVCNVWPuqxFpKW6w9vcVaThPWflphLakOay+dsJb1irWPXlhL+8fawyCSPAJJHoEkj0CSRyDJI5DkEUjyCCR5BJI8AkkegSSPQJJHIMkjkOQR+BR5v7fvtR+oz2wdAAAAAElFTkSuQmCC");
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.75;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}
</style>
