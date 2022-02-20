import { useSnackbar } from 'notistack'

// 'default' | 'error' | 'success' | 'warning' | 'info';

export const useSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar()
  const enquereDefault = (message: string) =>
    enqueueSnackbar(message, { variant: 'default' })
  const enquereSuccess = (message: string) =>
    enqueueSnackbar(message, { variant: 'success' })
  const enquereError = (message: string) =>
    enqueueSnackbar(message, { variant: 'error' })
  const enquereWarning = (message: string) =>
    enqueueSnackbar(message, { variant: 'warning' })
  const enquereInfo = (message: string) =>
    enqueueSnackbar(message, { variant: 'info' })

  return {
    enquereDefault,
    enquereSuccess,
    enquereError,
    enquereWarning,
    enquereInfo,
  }
}
