import React from 'react'
import PropTypes from 'prop-types'
import { Textarea } from '@preaction/inputs'

function ExampleSettings(props) {
  return (
    <div>
      <h6>OpenPGP Settings</h6>
      <hr className='mb-3' />
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
