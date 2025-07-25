import { marked } from "marked";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "../style.css";

dayjs.locale("es");

class DevotionalReader {
    constructor() {
        this.currentDate = dayjs();
        this.setupEventListeners();
        this.loadCurrentDevotional();
    }

    async loadDevotional(date) {
        try {
            const base = import.meta.env.BASE_URL || "/";
            const response = await fetch(
                `${base}devotionals/${date.format("YYYY-MM-DD")}.md`,
                {
                    headers: {
                        Accept: "text/markdown",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Devocional no encontrado");
            }

            const markdown = await response.text();

            if (
                markdown.includes("<!DOCTYPE html>") ||
                markdown.includes("<html")
            ) {
                throw new Error("Devocional no encontrado");
            }

            if (!markdown || markdown.trim() === "") {
                throw new Error("Devocional no encontrado");
            }

            const html = marked(markdown);
            document.getElementById("devotional-content").innerHTML = html;
            document.getElementById("current-date").textContent =
                date.format("D [de] MMMM, YYYY");
        } catch (error) {
            const isFutureDate = date.isAfter(dayjs(), "day");
            document.getElementById("devotional-content").innerHTML = `
                <div class="no-content-message">
                    <h1>${isFutureDate ? "¡Aún no está disponible!" : "Fin del recorrido"}</h1>
                    <p>${
                        isFutureDate
                            ? "Esta lectura estará disponible en la fecha indicada. Vuelve ese día para descubrir su contenido."
                            : 'Has llegado a las lecturas más antiguas disponibles. Puedes volver a lecturas más recientes usando el botón "Hoy".'
                    }</p>
                    <button id="back-to-today" class="nav-button">Volver a la lectura de hoy</button>
                </div>
            `;

            document
                .getElementById("back-to-today")
                .addEventListener("click", () => {
                    this.currentDate = dayjs();
                    this.loadDevotional(this.currentDate);
                });
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
