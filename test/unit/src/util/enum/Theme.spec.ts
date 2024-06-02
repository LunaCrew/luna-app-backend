import Theme from 'src/util/enum/Theme'

describe(':: Util :: Enum :: Theme ::', () => {
  it('should return expected keys', () => {
    const enumKeys = Object.keys(Theme)
    const keys = ['DARK', 'LIGHT']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(Theme)
    const values = ['dark', 'light']

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})
