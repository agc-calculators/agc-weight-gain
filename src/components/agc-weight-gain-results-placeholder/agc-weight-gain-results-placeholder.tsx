
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-weight-gain-results-placeholder'
})
export class AgcWeightGainResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                     <li>
                        <h2 data-i18n="results.start-weight">Start Weight</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.end-weight">End Weight</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.weight-gain-per-head">Weight Gain per Head</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.total-weight-gain">Total Weight Gain</h2>
                        {placeholder()}
                    </li>
                </ul>
            </section>
        );
    }
}