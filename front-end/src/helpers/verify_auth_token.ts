export const verify_auth_token = async (auth_token: string | any): Promise<string | void> => {
  try {
    if (auth_token == '' || auth_token == null) {
      return 'rejected'
    } else {
      const request_options: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jwt_token: auth_token,
        }),
      }

      const response = await fetch(
        'http://127.0.0.1:3000/registration/verify_token',
        request_options,
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
