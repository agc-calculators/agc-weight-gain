---
message: |
         <div class="agc-wizard__field">
             <label data-i18n="fields.<%=name%>"><%=h.inflection.undasherize(name)%></label>
             <input name="<%=name%>" type="text" required />
             <p class="agc-wizard__validation-message" data-i18n="validation.<%=name%>.required" data-validates="<%=name%>">Please enter a value.</p>
             <p data-i18n="hints.<%=name%>">⮤ Enter a value here.</p>
         </div>
---