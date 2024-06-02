import jsonwebtoken from 'jsonwebtoken'

export default class JWT {
  static readonly issueJWT = (userId: string) => {
    const secret = process.env.JWT_SECRET as string
    const payload = { 
      sub: userId,
      iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, secret, { expiresIn: '1h' })

    return {
      token: signedToken,
      expiresIn: '1h'
    }
  }
}
