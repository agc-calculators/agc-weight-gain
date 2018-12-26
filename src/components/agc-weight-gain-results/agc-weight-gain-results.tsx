
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-weight-gain-results'
})
export class AgcWeightGainResults {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false
    section: HTMLElement;

    render() {
        return (
            <section data-wizard-results ref={c => this.section = c as HTMLElement}>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                            <li>
                                <h2 data-i18n="results.start-weight">Start Weight</h2>
                                <span class="agc-results__value">{this.data['startWeight']}</span>
                            </li>
                            <li>
                                <h2 data-i18n="results.end-weight">End Weight</h2>
                                <span class="agc-results__value">{this.data['endWeight']}</span>
                            </li>
                            <li>
                                <h2 data-i18n="results.weight-gain">Weight Gain per Head</h2>
                                <span class="agc-results__value">{this.data['weightGainPerHead']}</span>
                            </li>
                            <li>
                                <h2 data-i18n="results.total-weight-gain">Total Weight Gain</h2>
                                <span class="agc-results__value">{this.data['totalWeightGain']}</span>
                            </li>                   
                        </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
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
}
