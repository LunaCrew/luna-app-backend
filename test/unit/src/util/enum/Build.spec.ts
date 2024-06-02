import Build from 'src/util/enum/Build'

describe(':: Util :: Enum :: Build ::', () => {
  it('should have the correct keys', () => {
    const expectedKeys = [
      'DEBUG',
      'CANARY',
      'STABLE'
    ]

    const enumKeysDeclared = Object.keys(Build)

    expect(expectedKeys).toEqual(enumKeysDeclared)
  })

  it('should have the correct values', () => {
    const expectedValues = [
      'debug',
      'canary',
      'stable'
    ]

    const enumValuesDeclared = Object.values(Build)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})
