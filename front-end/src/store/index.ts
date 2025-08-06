import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('users', {
  state: () => {
    return {
      router: useRouter(),
      jwtToken: localStorage.getItem('jwtToken'),
      userId: localStorage.getItem('userId'),
      userInfo: [] as userInfoInterface[],
    }
  },

  actions: {
    async getUserInfo(): Promise<void> {
      try {
        const requestInfo: requestOptionsInterface = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', jwt_token: this.jwtToken },
          body: JSON.stringify({
            userId: this.userId,
          }),
        }

        const response = await fetch(
          'http://127.0.0.1:3000/users-management/getUserInfo',
          requestInfo,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.userInfo.push(data.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})

interface userInfoInterface {
  id: string
  username: string
  email: string
  userSubjects: object[]
}

interface requestOptionsInterface {
  method: string | any
  mode: string | any
  headers: object | any
  body?: string | any
}
