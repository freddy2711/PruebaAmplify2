import classNames from "classnames"

export const extractClass = (
  styles: { [key: string]: string },
  classname: string
) => {
  const clasearray: Array<string> = classname.split(' ')

  const keystyles = Object.keys(styles)

  const siIncluye: string[] = []
  const noIncluye: string[] = []

  clasearray.map((item) =>
    keystyles.includes(item) ? siIncluye.push(item) : noIncluye.push(item)
  )

  const estilos = classNames(
    siIncluye.map((item) => `${styles[item]}`),
    noIncluye.map((item) => `${item}`)
  )

  return estilos
}