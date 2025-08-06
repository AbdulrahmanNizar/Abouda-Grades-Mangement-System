export const verifyAuthToken = async (authToken: string | any): Promise<string | void> => {
  try {
    if (authToken == '' || authToken == null) {
      return 'rejected'
    } else {
      const requestInfo: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jwtToken: authToken,
        }),
      }

      const response = await fetch('http://127.0.0.1:3000/registration/verifyToken', requestInfo)
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
