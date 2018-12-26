import { validate } from '../../utils';
// import { addDays, formatDate, inputDate, daysBetween } from '../../utils'
export class AgcWeightGain {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.mode = 'step';
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-weight-gain", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.head-count" }, "Head Count"),
                        h("input", { name: "headCount", type: "number", required: true, min: "1", step: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.head-count.required", "data-validates": "headCount" }, "Please enter a valid number of 1 or more."),
                        h("p", { "data-i18n": "hints.head-count" }, "\u2BA4 Enter the total number of head being fed.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.start-weight" }, "Start Weight"),
                        h("input", { name: "startWeight", type: "number", required: true, min: "1", step: ".1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.start-weight.required", "data-validates": "startWeight" }, "Please enter a valid weight of 1 or more."),
                        h("p", { "data-i18n": "hints.start-weight" }, "\u2BA4 Enter a starting weight.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.total-feed-intake" }, "Total Feed Intake"),
                        h("input", { name: "totalFeedIntake", type: "number", required: true, min: "1", step: ".1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.total-feed-intake.required", "data-validates": "totalFeedIntake" }, "Please enter a valid feed amount of 1 or more."),
                        h("p", { "data-i18n": "hints.total-feed-intake" }, "\u2BA4 Enter the total amount of feed consumed.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Continue")])),
                h("section", { "data-wizard-section": "4" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.feed-conversion-rate" }, "Feed Conversion Rate (FCR)"),
                        h("input", { name: "feedConversionRate", type: "number", required: true, min: "1", max: "10", step: ".1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.feed-conversion-rate.required", "data-validates": "feedConversionRate" }, "Please enter a valid conversion rate between 1 and 10."),
                        h("p", { "data-i18n": "hints.feed-conversion-rate" }, "\u2BA4 Enter the feed conversion rate between 1 and 10.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 5) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'headCount')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'startWeight')) {
                valid = false;
            }
        }
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'totalFeedIntake')) {
                valid = false;
            }
        }
        if (this.currentStep === 3 || this.mode === 'full') {
            if (!validate(this.form, 'feedConversionRate')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n;
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let headCount = parseFloat(this.form.querySelector('[name="headCount"]').value);
        let startWeight = parseFloat(this.form.querySelector('[name="startWeight"').value);
        let totalFeedIntake = parseFloat(this.form.querySelector('[name="totalFeedIntake"').value);
        let feedConversionRate = parseFloat(this.form.querySelector('[name="feedConversionRate"').value);
        let weightGainPerHead = parseFloat(((totalFeedIntake / headCount) / feedConversionRate).toFixed(2));
        let endWeight = parseFloat((startWeight + weightGainPerHead).toFixed(2));
        let totalWeightGain = parseFloat((weightGainPerHead * headCount).toFixed(2));
        let results = {
            socket: this.socket,
            tract: this.tract,
            startWeight,
            totalFeedIntake,
            feedConversionRate,
            weightGainPerHead,
            endWeight,
            totalWeightGain
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.form.querySelector('[name="headCount"]').defaultValue = "1";
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-weight-gain"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
