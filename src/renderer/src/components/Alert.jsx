// components/Alert.jsx
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Alert = ({
  type = 'success',
  title = '',
  text = '',
  timer = 1500,
  position = 'center',
  showConfirmButton = false,
  onClose = () => {}
}) => {
  useEffect(() => {
    MySwal.fire({
      position,
      icon: type,
      title,
      text,
      showConfirmButton,
      timer
    }).then(onClose)
  }, [type, title, text, timer, position, showConfirmButton, onClose])

  return null // karena SweetAlert adalah modal global
}

export default Alert
