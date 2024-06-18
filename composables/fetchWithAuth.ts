//* Adds token auth to the header

export async function $fetchWithAuth<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1],
) {
  const auth = useAuthStore()

  try {
    const response = await $fetch<T>(request, {
      ...opts,
      headers: {
        Authorization: auth.isLogged ? `Bearer ${auth.accessToken}` : '',
        ...opts?.headers,
      },
    })
    return response;
  } catch (error: any) {
    // If the Token expired, refresh it and try again
    if (error.statusCode == 403) {
      await auth.dispatchRefreshToken();

      const response = await $fetch<T>(request, {
        ...opts,
        headers: {
          Authorization: auth.isLogged ? `Bearer ${auth.accessToken}` : '',
          ...opts?.headers,
        },
      })
      return response;
    } else throw error;
  }
}