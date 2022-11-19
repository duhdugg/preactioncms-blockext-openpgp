# Preaction CMS OpenPGP Extension Block

This is an extension block for [Preaction CMS](https://github.com/duhdugg/preaction-cms).

## Installing in Preaction CMS (compile from source)

### clone this repo into your `cms/src/ext` directory

```bash
cd /path/to/preactioncms/src/ext
git clone https://github.com/duhdugg/preactioncms-blockext-openpgp blockext-openpgp
```

### build the extension

```bash
cd /path/to/preactioncms/src/ext/blockext-openpgp
yarn
yarn build
rm -r node_modules # IMPORTANT to not skip this cleanup step
```

### register the extension (and its settings) in `cms/src/ext/index.js`

```javascript
import React, { Suspense } from 'react'
import { Spinner } from '@preaction/bootstrap-clips'
import OpenPGP from './blockext-openpgp/dist/preactioncms-blockext-openpgp.esm.js'
const OpenPGPSettings = React.lazy(
  () =>
    import(
      './blockext-openpgp/dist/preactioncms-blockext-openpgp-settings.esm.js'
    )
)
const blockExtensionSettings = {
  OpenPGPSettings: function (props) {
    return (
      <Suspense fallback={<Spinner />}>
        <OpenPGPSettings {...props} />
      </Suspense>
    )
  }
}
OpenPGP.Settings = blockExtensionSettings.OpenPGPSettings
const blockExtensions = { OpenPGP }
// ...
```

### rebuild CMS client

```bash
cd /path/to/preactioncms
yarn build
```
