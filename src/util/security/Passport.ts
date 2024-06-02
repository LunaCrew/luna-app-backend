import JwtStrategy, { ExtractJwt } from 'passport-jwt'
import { PassportStatic } from 'passport'
import { collections } from '../../app'
import { JwtPayload, Done } from '../../types/JwtPayload'
import { User } from '../../types/User'
import dotenv from 'dotenv'

dotenv.config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string
}

export default (passport: PassportStatic) => {
  passport.use(new JwtStrategy.Strategy(options, async (jwt_payload: JwtPayload, done: Done) => {
    try {
      const user = await collections.users.findOne({ id: jwt_payload.sub })
      if (user) {
        return done(null, user as unknown as User)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  }))
}
