export type User = {
  _id: string
  email: string
  name: string
  password: string
  createdAt: string
  deletedAt: string | null
  settings: {
    theme: string
    animations: boolean
    notificationType: string
    speechType: string
    publicKey: string | null
    mfa: {
      mfaToken: string | null
      mfaSecret: string | null
      mfaRecoveryCodes: string[] | null
      mfaRecoveryCodesGeneratedAt: string | null
      mfaRecoveryCodesUsedAt: string | null
      mfaRecoveryCodesRegeneratedAt: string | null
      mfaRecoveryCodesUsedCount: number | null
    }
    backupAccount: string | null
    buildVersion: string
  }
}

export type UserParams = {
  id: string
  email: string
}
