import type { Lesson, Slide } from "../../shared/types";

export function render(s: Slide) {
    return `<div class="slide">${s.content}</div>`;
}

export function render_all(l: Lesson) {
    return `
        <div class="lenta" style="display: flex; flex-wrap: wrap; gap: 10px;">
        <style>
            .slide {
                height: 200px;
                width: 300px;
                border: 1px solid black;
                border-radius: 4px;
                display: flex;
            }
        </style>
        ${l.slides.map(render).join('')}
        </div>
    `;
}
