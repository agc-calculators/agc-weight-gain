
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate } from '../../utils'

// import { addDays, formatDate, inputDate, daysBetween } from '../../utils'

@Component({
    tag: 'agc-weight-gain'
})
export class AgcWeightGain {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-weight-gain" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.head-count">Head Count</label>
                            <input name="headCount" type="number" required min="1" step="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.head-count.required" data-validates="headCount">Please enter a valid number of 1 or more.</p>
                            <p data-i18n="hints.head-count">⮤ Enter the total number of head being fed.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.start-weight">Start Weight</label>
                            <input name="startWeight" type="number" required min="1" step=".1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.start-weight.required" data-validates="startWeight">Please enter a valid weight of 1 or more.</p>
                            <p data-i18n="hints.start-weight">⮤ Enter a starting weight.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.total-feed-intake">Total Feed Intake</label>
                            <input name="totalFeedIntake" type="number" required min="1" step=".1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.total-feed-intake.required" data-validates="totalFeedIntake">Please enter a valid feed amount of 1 or more.</p>
                            <p data-i18n="hints.total-feed-intake">⮤ Enter the total amount of feed consumed.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Continue</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="4">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.feed-conversion-rate">Feed Conversion Rate (FCR)</label>
                            <input name="feedConversionRate" type="number" required min="1" max="10" step=".1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.feed-conversion-rate.required" data-validates="feedConversionRate">Please enter a valid conversion rate between 1 and 10.</p>
                            <p data-i18n="hints.feed-conversion-rate">⮤ Enter the feed conversion rate between 1 and 10.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 5)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'headCount')) {
                valid = false
            }
        }

        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'startWeight')) {
                valid = false
            }
        }
        
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'totalFeedIntake')) {
                valid = false
            }
        }        

        if (this.currentStep === 3 || this.mode === 'full') {
            if (!validate(this.form, 'feedConversionRate')) {
                valid = false
            }
        }  

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let headCount = parseFloat((this.form.querySelector('[name="headCount"]') as HTMLInputElement).value);
        let startWeight =  parseFloat((this.form.querySelector('[name="startWeight"') as HTMLInputElement).value);
        let totalFeedIntake = parseFloat((this.form.querySelector('[name="totalFeedIntake"') as HTMLInputElement).value);
        let feedConversionRate = parseFloat((this.form.querySelector('[name="feedConversionRate"') as HTMLInputElement).value);
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
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        (this.form.querySelector('[name="headCount"]') as HTMLInputElement).defaultValue = "1";

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}