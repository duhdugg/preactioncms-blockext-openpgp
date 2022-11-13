import OpenPGP from './OpenPGP.jsx'
import OpenPGPSettings from './OpenPGPSettings.jsx'
import { Boilerplate, Card } from '@preaction/bootstrap-clips'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@preaction/bootstrap-clips/dist/preaction-bootstrap-clips.css'
import './mock.scss'

OpenPGP.Settings = OpenPGPSettings

const mockPropsData = {
  publicKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=DLm0
-----END PGP PUBLIC KEY BLOCK-----
`,
}

const mockPreaction = {
  appRoot: '',
  block: {
    blockType: 'ext',
    settings: {
      header: 'Component View',
      extKey: 'OpenPGP',
      propsData: mockPropsData,
    },
  },
  editable: false,
  settings: { siteTitle: 'Preaction CMS Extension Testing' },
  page: { settings: {} },
  navigate: (path) => {
    console.debug(`navigate('${path}')`)
  },
}

const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

// emulates how the component is rendered in Preaction CMS
function MockCMS(props) {
  // STATE
  const [propsData, setPropsData] = React.useState(mockPropsData)
  const [preaction] = React.useState(mockPreaction)
  // CALLBACKS
  const getPropsDataValueHandler = React.useCallback(
    (key) => {
      return (value) => {
        const pd = copyObj(propsData)
        pd[key] = value
        setPropsData(pd)
      }
    },
    [propsData]
  )
  // RENDER
  return (
    <div className='App mock'>
      <Boilerplate
        footer={
          <Card header='Settings View' headerTheme='dark'>
            <OpenPGP.Settings
              propsData={propsData}
              getPropsDataValueHandler={getPropsDataValueHandler}
            />
          </Card>
        }
      >
        <Card header={mockPreaction.block.settings.header} headerTheme='blue'>
          <OpenPGP preaction={preaction} {...propsData} />
        </Card>
      </Boilerplate>
    </div>
  )
}

export default MockCMS
