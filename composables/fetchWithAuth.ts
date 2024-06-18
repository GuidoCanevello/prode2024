//* Adds token auth to the header

export function $fetchWithAuth<T>(
    request: Parameters<typeof $fetch<T>>[0],
    opts?: Parameters<typeof $fetch<T>>[1],
  ) {
    const auth = useAuthStore()
  
    return $fetch<T>(request, {
      ...opts,
      headers: {
        Authorization: auth.isLogged ? `Bearer ${auth.accessToken}` : '',
        ...opts?.headers,
      },
    })
  }