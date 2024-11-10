class MentalHealthQuestion extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.getElementById('mental-health-template').content;
        const clone = document.importNode(template, true);
        shadow.appendChild(clone);

        const questionText = this.getAttribute('question-text');
        shadow.querySelector('.question').textContent = questionText;
    }
}
customElements.define('mental-health-question', MentalHealthQuestion);
