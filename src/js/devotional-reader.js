import { marked } from "marked";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

class DevotionalReader {
    constructor() {
        this.currentDate = dayjs();
        this.setupEventListeners();
        this.loadCurrentDevotional();
    }

    async loadDevotional(date) {
        try {
            const response = await fetch(
                `/devotionals/${date.format("YYYY-MM-DD")}.md`
            );
            if (!response.ok) {
                throw new Error("Devocional no encontrado");
            }
            const markdown = await response.text();
            const html = marked(markdown);
            document.getElementById("devotional-content").innerHTML = html;
            document.getElementById("current-date").textContent =
                date.format("D [de] MMMM, YYYY");
        } catch (error) {
            document.getElementById("devotional-content").innerHTML = `
                <h1>Devocional no disponible</h1>
                <p>Lo sentimos, no hay una lectura disponible para esta fecha.</p>
            `;
        }
    }

    loadCurrentDevotional() {
        this.loadDevotional(this.currentDate);
    }

    setupEventListeners() {
        document.getElementById("prev-day").addEventListener("click", () => {
            this.currentDate = this.currentDate.subtract(1, "day");
            this.loadDevotional(this.currentDate);
        });

        document.getElementById("today").addEventListener("click", () => {
            this.currentDate = dayjs();
            this.loadDevotional(this.currentDate);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new DevotionalReader();
});
