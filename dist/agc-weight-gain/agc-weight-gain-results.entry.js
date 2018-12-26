/*! Built with http://stenciljs.com */
const { h } = window.AgcWeightGain;

class AgcWeightGainResults {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.start-weight" }, "Start Weight"),
                    h("span", { class: "agc-results__value" }, this.data['startWeight'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.end-weight" }, "End Weight"),
                    h("span", { class: "agc-results__value" }, this.data['endWeight'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.weight-gain" }, "Weight Gain per Head"),
                    h("span", { class: "agc-results__value" }, this.data['weightGainPerHead'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.total-weight-gain" }, "Total Weight Gain"),
                    h("span", { class: "agc-results__value" }, this.data['totalWeightGain'])))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-weight-gain-results"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}

export { AgcWeightGainResults };
