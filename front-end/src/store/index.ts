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

export const useGradesTablesStore = defineStore('gradesTables', {
  state: () => {
    return {
      userId: <string | null>localStorage.getItem('userId'),
      jwtToken: <string | null>localStorage.getItem('jwtToken'),
      userGradesTablesYears: <userGradesTablesYearsInterface[]>[],
    }
  },

  actions: {
    async getTablesYears(): Promise<void> {
      try {
        const requestOptions: any = {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', jwt_token: this.jwtToken },
        }

        const response = await fetch(
          'http://127.0.0.1:3000/grades-management/getGradesTablesYears/' + this.userId,
          requestOptions,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
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
}

interface requestOptionsInterface {
  method: string | any
  mode: string | any
  headers: object | any
  body?: string | any
}

interface userGradesTablesYearsInterface {
  year: string
}
