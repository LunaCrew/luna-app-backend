import SpeechType from 'src/util/enum/SpeechType'

describe(':: Util :: Enum :: SpeechType ::', () => {
  it('should return expected keys', () => {
    const enumKeys = Object.keys(SpeechType)
    const keys = ['MALE', 'FEMALE', 'NEUTRAL']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(SpeechType)
    const values = ['male', 'female', 'neutral']

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})
