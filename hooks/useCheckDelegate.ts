import { useState } from 'react'

const useCheckDelegate = () => {
  const initState = [
    {
      Email: '',
      Name: '',
      cellMovil: '',
      classCode: '',
      code: '',
      delegateId: {},
      emailUPN: '',
      firstName: '',
      lastName: '',
      madeEstate: '',
      madeNroVeces: 1,
      state: {},
    },
  ]

  const [delegados, setdelegados] = useState(initState)

  return {
    delegados,
    setdelegados,
  }
}

export default useCheckDelegate
