/*! Built with http://stenciljs.com */
const { h } = window.AgcWeightGain;

class AgcWeightGainResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.start-weight" }, "Start Weight"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.end-weight" }, "End Weight"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.weight-gain-per-head" }, "Weight Gain per Head"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.total-weight-gain" }, "Total Weight Gain"),
                    placeholder()))));
    }
    static get is() { return "agc-weight-gain-results-placeholder"; }
}

export { AgcWeightGainResultsPlaceholder };
