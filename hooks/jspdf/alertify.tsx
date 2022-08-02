
// import alertifyJs from 'alertifyjs'
import Swal from 'sweetalert2'

interface Props {
  title?: string
  text?: any
  confirmButtonText?: string
}

const getAlert = ({ title, text, confirmButtonText }: Props) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: confirmButtonText,
  })
}

export default getAlert
