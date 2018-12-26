---
to: stencil.config.ts
---
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: '<%=library%>',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};

