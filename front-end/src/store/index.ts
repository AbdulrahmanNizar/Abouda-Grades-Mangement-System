import { defineStore } from 'pinia'

export const use_users_store = defineStore('users', {
  state: () => {
    return {
      jwt_token: localStorage.getItem('jwt_token'),
      user_id: localStorage.getItem('user_id'),
      user_info: [] as user_info_interface[],
    }
  },

  actions: {
    async get_user_info(): Promise<void> {
      try {
        const request_options: request_options_interface = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', jwt_token: this.jwt_token },
          body: JSON.stringify({
            user_id: this.user_id,
          }),
        }

        const response = await fetch(
          'http://127.0.0.1:3000/users-management/get_user_info',
          request_options,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.user_info.push(data.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})

interface user_info_interface {
  id: string
  username: string
  email: string
  user_subjects: object[]
}

interface request_options_interface {
  method: string | any
  mode: string | any
  headers: object | any
  body?: string | any
}
