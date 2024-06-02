import crypto from 'crypto'

class Password {
  static readonly encrypt = (password: string) => {
    const salt = crypto.createHash('sha256').update('16').digest('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex')
    return hash
  }

  static readonly validate = (password: string, hashed: string): boolean => {
    const hash = this.encrypt(password)

    if (hashed === hash) {
      return true
    } else {
      return false
    }
  }
}

export default Password
