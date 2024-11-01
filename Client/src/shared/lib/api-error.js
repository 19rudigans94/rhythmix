export class APIError extends Error {
  constructor(message, code, details = null) {
    super(message)
    this.name = 'APIError'
    this.code = code
    this.details = details
  }

  static fromResponse(error) {
    if (error.response) {
      return new APIError(
        error.response.data.message || 'An error occurred',
        error.response.status,
        error.response.data.details
      )
    }
    return new APIError(
      error.message || 'Network error',
      0
    )
  }
}