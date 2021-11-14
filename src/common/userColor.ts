const userColors = [
  {
    name: 'blue',
    code: '#2f506a',
  },
  {
    name: 'green',
    code: '#85b1ad',
  },
  {
    name: 'red',
    code: '#c89da1',
  },
  {
    name: 'black',
    code: '#343249',
  },
]

type UserColors = typeof userColors

export const getUserColor = (colorName: string) => {
  const color = userColors.find(
    (userColor) => userColor.name === colorName,
  )?.code
  return !color ? '#343249' : color
}
