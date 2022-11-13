import React from 'react'
import PropTypes from 'prop-types'
import { Textarea } from '@preaction/inputs'
import { readKey, encrypt, createMessage } from 'openpgp'
import ClipboardJS from 'clipboard'
import { FaLock } from 'react-icons/fa'

function OpenPGP(props) {
  const [msg, setMsg] = React.useState('')
  const [enc, setEnc] = React.useState('')
  const encryptMessage = React.useCallback(() => {
    ;(async () => {
      if (!props.publicKey) {
        return
      }
      const publicKey = await readKey({ armoredKey: props.publicKey })
      const message = await createMessage({ text: msg })
      const encrypted = await encrypt({
        message,
        encryptionKeys: publicKey,
      })
      setEnc(encrypted)
      new ClipboardJS('.btn-encrypt', {
        text: function () {
          return encrypted
        },
      })
    })()
  }, [msg, props.publicKey])
  // clear encrypted value when msg changes
  React.useEffect(() => {
    setEnc('')
  }, [msg])
  return (
    <div className='blockext-openpgp'>
      <Textarea label='Input Message' valueHandler={setMsg} value={msg} />
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-primary btn-encrypt'
          onClick={encryptMessage}
        >
          <FaLock /> Encrypt
        </button>
      </div>
      {!!enc ? <Textarea label='Encrypted Message' value={enc} readOnly /> : ''}
    </div>
  )
}

OpenPGP.propTypes = {
  preaction: PropTypes.object.isRequired,
  publicKey: PropTypes.string.isRequired,
}

OpenPGP.extensionType = 'block'
OpenPGP.label = 'OpenPGP Extension Block'
OpenPGP.defaultProps = {
  publicKey: '',
}

export default OpenPGP
