type Props = {
  path: string
  queries: string[]
}

export const pathBuilder = ({ path, queries }: Props) => {
  const queryString = queries
    .filter((query) => !!query)
    .map((query) => `${query}=${query}`)
    .join('&')
  return `${path}?${queryString}`
}
