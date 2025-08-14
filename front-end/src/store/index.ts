import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('users', {
  state: () => {
    return {
      router: useRouter(),
      jwtToken: <string | null>localStorage.getItem('jwtToken'),
      userId: <string | null>localStorage.getItem('userId'),
      userInfo: <userInfoInterface[]>[],
    }
  },

  actions: {
    async getUserInfo(): Promise<void> {
      try {
        const requestOptions: RequestInit = {
          method: 'POST',
          mode: 'cors',
          headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: this.jwtToken },
          body: <BodyInit>JSON.stringify({
            userId: this.userId,
          }),
        }

        const response = await fetch(
          'http://127.0.0.1:3000/users-management/getUserInfo',
          requestOptions,
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

export const useGradesTablesStore = defineStore('gradesTables', {
  state: () => {
    return {
      userId: <string | null>localStorage.getItem('userId'),
      jwtToken: <string | null>localStorage.getItem('jwtToken'),
      userGradesTablesYears: <userGradesTablesYearsInterface[]>[],
      loading: <boolean>false,
    }
  },

  actions: {
    async getTablesYears(): Promise<void> {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          mode: 'cors',
          headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: this.jwtToken },
        }

        this.loading = true
        const response = await fetch(
          'http://127.0.0.1:3000/grades-management/getGradesTablesYears/' + this.userId,
          requestOptions,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.loading = false
          this.userGradesTablesYears = data.data
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
  userSubjects: string[]
  userAccountPicture: string
}

interface userGradesTablesYearsInterface {
  year: string
}
