---
to: src/components/<%=name%>/<%=name%>.tsx
---
<% const comp = h.inflection.undasherize(name) -%>
import { Component, Prop } from '@stencil/core';

@Component({
    tag: '<%=name%>',
    styleUrl: '<%=name%>.css'
})
export class <%=comp%> {

    render() {
        return (
            <div><%=name%></div>
        )
    }
}