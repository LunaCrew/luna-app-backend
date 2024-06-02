import joi from 'joi'
import Theme from '../util/enum/Theme'
import InputPattern from '../util/enum/InputPattern'
import NotificationType from '../util/enum/NotificationType'
import SpeechType from '../util/enum/SpeechType'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import Build from '../util/enum/Build'

const mfaSchema = joi.object({
  mfaToken: joi.string().default(null),
  mfaSecret: joi.string().default(null),
  mfaRecoveryCodes: joi.array().items(joi.string()).default(null),
  mfaRecoveryCodesGeneratedAt: joi.string().default(null),
  mfaRecoveryCodesUsedAt: joi.string().default(null),
  mfaRecoveryCodesRegeneratedAt: joi.string().default(null),
  mfaRecoveryCodesUsedCount: joi.number().default(null),
})

const settingsSchema = joi.object({
  theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
  animations: joi.boolean().default(true),
  notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.POPUP),
  speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL),
  publicKey: joi.string().default(null),
  mfa: joi.object().concat(mfaSchema).required(),
  backupAccount: joi.string().lowercase().email().default(null),
  buildVersion: joi.string().valid(...Object.values(Build)).default(Build.DEBUG),
})

const userSchema = joi.object({
  name: joi.string().min(2).max(16).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(16).pattern(InputPattern.PASSWORD).messages({ 'string.pattern.base': CustomErrorMessage.PASSWORD }).required(),
  createdAt: joi.string().default(new Date().toISOString()),
  deletedAt: joi.string().default(null),
  settings: joi.object().concat(settingsSchema).required(),
})

const userParams = joi.object({
  id: joi.string().guid({ version: 'uuidv4' }),
  email: joi.string().lowercase().email(),
}).or('id', 'email').required()

const loginParams = joi.object({  
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(16).required(),
})

export { userParams, loginParams }
export default userSchema
