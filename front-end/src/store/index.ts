import { useVerifyAuthToken } from '@/composables/verifyAuthToken'
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
        if (
          this.userId != '' &&
          this.userId != null &&
          this.jwtToken != '' &&
          this.jwtToken != null
        ) {
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
          } else if (data.statusCode == 403) {
            this.router.push({ path: '/registration' })
          }
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
      router: useRouter(),
      userId: <string | null>localStorage.getItem('userId'),
      jwtToken: <string | null>localStorage.getItem('jwtToken'),
      userGradesTableDetails: <userGradesTableInterface[]>[],
      userGradesTablesYears: <string[]>[],
      loading: <boolean>false,
      gradesTableNotFoundMessage: <string>'',
      showGradesTableNotFoundMessage: <boolean>false,
    }
  },

  actions: {
    async getGradesTableDetails(tableId: string): Promise<void> {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          mode: 'cors',
          headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: this.jwtToken },
        }

        const response = await fetch(
          'http://127.0.0.1:3000/grades-management/getGradesTableDetails?tableId=' + tableId,
          requestOptions,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.userGradesTableDetails = data.data
        } else if (data.statusCode == 403) {
          this.router.push({ path: '/registration' })
        } else {
          this.gradesTableNotFoundMessage = data.message
          this.showGradesTableNotFoundMessage = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getTablesYears(): Promise<void> {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          mode: 'cors',
          headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: this.jwtToken },
        }

        this.loading = true
        const response = await fetch(
          'http://127.0.0.1:3000/grades-management/getGradesTablesYears?userId=' + this.userId,
          requestOptions,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.loading = false
          this.userGradesTablesYears = data.data
        } else if (data.statusCode == 403) {
          this.router.push({ path: '/registration' })
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})

export const useSubjectsStore = defineStore('subjects', {
  state: () => {
    return {
      router: useRouter(),
      userId: <string | null>localStorage.getItem('userId'),
      jwtToken: <string | null>localStorage.getItem('jwtToken'),
      userSubjects: <string[]>[],
    }
  },

  actions: {
    async getSubjects(): Promise<void> {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          mode: 'cors',
          headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: this.jwtToken },
        }

        const response = await fetch(
          'http://127.0.0.1:3000/subjects-management/getSubjects?userId=' + this.userId,
          requestOptions,
        )
        const data = await response.json()
        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.userSubjects = data.data
        } else if (data.statusCode == 403) {
          this.router.push({ path: '/registration' })
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})

export const useJwtTokensStore = defineStore('jwtToken', {
  state: () => {
    return {
      router: useRouter(),
      jwtToken: <string | null>localStorage.getItem('jwtToken'),
      userAuthorized: <boolean>false,
    }
  },

  actions: {
    async validateJwtToken(): Promise<void> {
      if (this.jwtToken != '' && this.jwtToken != null) {
        const jwtTokenValidation = await useVerifyAuthToken(this.jwtToken)
        if (jwtTokenValidation == 'rejected') {
          this.router.push({ path: '/registration' })
        } else if (jwtTokenValidation == 'accepted') {
          this.userAuthorized = true
        }
      } else {
        this.router.push({ path: '/registration' })
      }
    },
  },
})

export interface userInfoInterface {
  id: string
  username: string
  email: string
  userSubjects: string[]
  accountPicture: string
}

export interface gradesTableInterface {
  subject: string | undefined
  grade: number
}

export interface userGradesTableInterface {
  _id: string
  userId: string
  userGradesTableYear: string
  userGradesTableTrimester: string
  userGradesTable: gradesTableInterface[]
  userGradesTableAverage: number
}
