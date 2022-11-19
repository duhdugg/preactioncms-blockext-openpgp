import React from 'react'
import PropTypes from 'prop-types'
import { Input, Textarea } from '@preaction/inputs'

function ExampleSettings(props) {
  return (
    <div>
      <h6>OpenPGP Settings</h6>
      <hr className='mb-3' />
      <Input
        label='OpenPGP Library Source'
        type='url'
        placeholder='https://cdn.jsdelivr.net/npm/openpgp@5.5.0/dist/openpgp.min.js'
        value={props.propsData.src}
        valueHandler={props.getPropsDataValueHandler('src')}
      />
      <Textarea
        label='Public Key'
        value={props.propsData.publicKey}
        valueHandler={props.getPropsDataValueHandler('publicKey')}
      />
    </div>
  )
}

ExampleSettings.propTypes = {
  propsData: PropTypes.object.isRequired,
  getPropsDataValueHandler: PropTypes.func.isRequired,
}

export default ExampleSettings
