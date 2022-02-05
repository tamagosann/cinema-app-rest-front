type Props = {
  path: string
  queries: {
    name: string
    value: string | number
  }[]
}

export const pathBuilder = ({ path, queries }: Props) => {
  const queryString = queries
    .filter((query) => !!query.value)
    .map((query) => `${query.name}=${query.value}`)
    .join('&')
  return `${path}?${queryString}`
}
