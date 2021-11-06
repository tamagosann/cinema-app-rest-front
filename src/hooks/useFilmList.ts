import useSWR from 'swr'

type UseIssueCountInput = {
  org: string
  repo: string
}

type UseIssueCountOutput = {
  count?: number
  error?: Error
  isLoading: boolean
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useIssueCount = (
  input: UseIssueCountInput,
): UseIssueCountOutput => {
  const { org, repo } = input
  const url = `https://api.github.com/repos/${org}/${repo}/issues`
  const { data, error } = useSWR<[], Error>(url, fetcher)

  return {
    count: data?.length,
    error,
    isLoading: !error && !data,
  }
}
