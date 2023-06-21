// Spooky Comment

export interface ApiResponseData<T> {
  code: number
  message: string
  data?: T
}

export interface ApiResponse {
  success: boolean
  message: string
}
