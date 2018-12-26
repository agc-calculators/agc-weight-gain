---
message: |
         <div class="agc-wizard__actions">
             <button class="agc-wizard__actions-back" data-i18n="actions.back" onClick=\{this.nextPrev.bind(this, -1)\}>Back</button>
             <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick=\{this.nextPrev.bind(this, this.mode === 'step' ? 1 : 2)\}>Calculate</button>
         </div>
---
