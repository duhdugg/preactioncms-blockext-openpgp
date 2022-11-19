import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Spinner } from '@preaction/bootstrap-clips'
import { Textarea } from '@preaction/inputs'
import ClipboardJS from 'clipboard'
import { FaClipboard, FaLock } from 'react-icons/fa'

function OpenPGP(props) {
  const [msg, setMsg] = React.useState('')
  const [enc, setEnc] = React.useState('')
  const [state, setState] = React.useState('loading')
  const encryptMessage = React.useCallback(() => {
    ;(async () => {
      if (!props.publicKey) {
        return
      }
      if (typeof window === 'undefined' || !window.openpgp) {
        return
      }
      const openpgp = window.openpgp
      const publicKey = await openpgp.readKey({ armoredKey: props.publicKey })
      const message = await openpgp.createMessage({ text: msg })
      const encrypted = await openpgp.encrypt({
        message,
        encryptionKeys: publicKey,
      })
      setEnc(encrypted)
    })()
  }, [msg, props.publicKey])
  const copyEncrypted = React.useCallback(() => {
    new ClipboardJS('.btn-encrypt', {
      text: function () {
        return enc
      },
    })
  }, [enc])
  // clear encrypted value when msg changes
  React.useEffect(() => {
    setEnc('')
  }, [msg])
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (typeof document === 'undefined') {
      return
    }
    if (window.openpgp) {
      setState('loaded')
      return
    }
    const head = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('src', props.src)
    head.appendChild(script)
    window.openPGPcheckInterval = setInterval(() => {
      if (window.openpgp) {
        setState('loaded')
        clearInterval(window.openPGPcheckInterval)
      }
    }, 100)
    return () => {
      head.removeChild(script)
      clearInterval(window.openPGPcheckInterval)
    }
  }, [props.src])
  return (
    <div className='blockext-openpgp'>
      {
        {
          loading: <Spinner>Loading OpenPGP</Spinner>,
          loaded: (
            <>
              <Textarea
                label='Input Message'
                valueHandler={setMsg}
                value={msg}
              />
              <div className='btn-group'>
                <button
                  type='button'
                  className='btn btn-secondary btn-encrypt'
                  onClick={encryptMessage}
                >
                  <FaLock /> Encrypt
                </button>
              </div>
              {!!enc ? (
                <>
                  <Textarea label='Encrypted Message' value={enc} readOnly />
                  <div className='btn-group'>
                    <button
                      type='button'
                      className='btn btn-secondary btn-encrypt'
                      onClick={copyEncrypted}
                    >
                      <FaClipboard /> Copy
                    </button>
                  </div>
                </>
              ) : (
                ''
              )}
            </>
          ),
          error: <Alert level='error'>Error loading OpenPGP libray.</Alert>,
        }[state]
      }
    </div>
  )
}

OpenPGP.propTypes = {
  src: PropTypes.string.isRequired,
  preaction: PropTypes.object.isRequired,
  publicKey: PropTypes.string.isRequired,
}

OpenPGP.extensionType = 'block'
OpenPGP.label = 'OpenPGP Extension Block'
OpenPGP.defaultProps = {
  src: 'https://cdn.jsdelivr.net/npm/openpgp@5.5.0/dist/openpgp.min.js',
  publicKey: '',
}

export default OpenPGP
