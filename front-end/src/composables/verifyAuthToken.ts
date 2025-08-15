export const useVerifyAuthToken = async (authToken: string | null): Promise<string | void> => {
  try {
    if (authToken == '' || authToken == null) {
      return 'rejected'
    } else {
      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jwtToken: authToken,
        }),
      }

      const response = await fetch(
        'http://192.168.1.241:3000/registration/verifyToken',
        requestOptions,
      )
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        return 'accepted'
      } else if (data.name == 'JsonWebTokenError') {
        return 'rejected'
      }
    }
  } catch (err) {
    console.log(err)
  }
}
