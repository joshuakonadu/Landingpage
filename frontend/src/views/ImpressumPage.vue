<template>
    <div class="d-flex justify-content-center p-4">
        <div class="text-white" id="content">
            <div class="top-text">
                <h1>Impressum</h1>
                landingpage
                <br />
                Joshua Konadu
                <br />
                mobil: ...
                <br />
                <a href="mailto:kontakt@landingpage.de">kontakt@landingpage.de</a>
                <br />
                <router-link to="/">www.landingpage.de</router-link>
                <br />
                <br />
                Copyright © Joshua Konadu Hamburg, September Januar 2021
            </div>

            <h3>Rechtliche Hinweise</h3>
            <br />
            Haftungsbeschränkung:<br />
            Die Inhalte der Website werden mit größtmöglicher Sorgfalt<br />
            erstellt. Der Anbieter übernimmt jedoch keine Gewähr für die<br />
            Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten<br />
            Inhalte. Die Nutzung der Inhalte der Website erfolgt auf<br />
            eigene Gefahr des Nutzers.<br />
            <br />
            Namentlich gekennzeichnete Beiträge geben die Meinung des<br />
            jeweiligen Autors und nicht die Meinung des Anbieters wieder.<br />
            <br />
            Mit der reinen Nutzung der Website des Anbieters kommt kein<br />
            Vertrag zwischen dem Nutzer und dem Anbieter zustande.<br />
            <br /><br />

            Externe Links:<br />
            Diese Website enthält Verknüpfungen zu Websites Dritter<br />
            (externe Links). Diese Websites unterliegen der Haftung der<br />
            jeweiligen Betreiber. Der Anbieter hat keinen Einfluss auf die<br />
            aktuelle und zukünftige Gestaltung und auf sämtliche Inhalte<br />
            der verknüpften Seiten.<br />
            <br />
            Das Setzen externer Links bedeutet nicht, dass sich der<br />
            Anbieter, die hinter dem Verweis oder Link liegenden Inhalte<br />
            zu Eigen macht.<br />
            <br />
            Die ständige Kontrolle externer Links ist für den Anbieter,<br />
            ohne konkrete Hinweise auf Rechtsverstöße, nicht zumutbar.<br />
            Bei Kenntnis von Rechtsverstößen werden jedoch derartige<br />
            externe Links unverzüglich gelöscht.<br />
            <br /><br />

            Urheber- und Leistungsschutzrecht:<br />
            Die auf der Website veröffentlichten Inhalte unterliegen dem<br />
            deutschen Urheber- und Leistungsschutzrecht.<br />
            <br />
            Jede vom deutschen Urheber- und Leistungsschutzrecht<br />
            nicht zugelassene Verwertung, bedarf der vorherigen, schriftlichen<br />
            Zustimmung des Anbieters oder des jeweiligen Rechteinhabers.<br />
            Dies gilt besonders für Vervielfältigung, Bearbeitung, Übersetzung,<br />
            Einspeicherung, Verarbeitung und Wiedergabe von Inhalten in<br />
            Datenbanken oder anderen elektronischen Medien und Systemen.<br />
            Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet.<br />
            <br />
            Die unerlaubte Vervielfältigung oder Weitergabe kompletter Seiten<br />
            ist nicht gestattet und strafbar.<br />
            <br />
            Die Darstellung dieser Website oder einzelner Inhalte, in fremden<br />
            Frames ist nur mit schriftlicher Erlaubnis zulässig.<br />
            <br /><br />

            Datenschutz:<br />
            Der Anbieter weist ausdrücklich darauf hin, dass die Daten-<br />
            übertragung im Internet (z.B. bei der Kommunikation per E-Mail)<br />
            Sicherheitslücken aufweist und nicht lückenlos vor dem Zugriff<br />
            durch Dritte geschützt werden kann.<br />
            <br />
            Die Verwendung der Kontaktdaten des Impressums, zu gewerb-<br />
            lichen Zwecken, ist ausdrücklich nicht erwünscht, es sei denn,<br />
            der Anbieter hat zuvor seine schriftliche Einwilligung erteilt oder<br />
            es besteht bereits eine Geschäftsbeziehung.<br />
            <br />
            Der Anbieter und alle auf dieser Website genannten Personen<br />
            widersprechen hiermit, jeder kommerziellen Verwendung und<br />
            Weitergabe ihrer Daten.
        </div>
    </div>
</template>

<script>
export default {
    name: "ImpressumPage",
    created() {
        window.scrollTo(0, 0);
    },
};
</script>

<style scoped>
.top-text {
    line-height: 2;
    margin-bottom: 3rem;
}
</style>
