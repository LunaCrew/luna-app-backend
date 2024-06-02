import MongoDBError from 'src/util/enum/MongoDbError'

describe(':: Util :: Enum :: MongoDBError ::', () => {
  it('should have all the code keys', () => {
    const expectedKeys = [
      'DUPLICATE_KEY',
      'INTERNAL_ERROR'
    ]

    const enumKeysDeclared = Object.keys(MongoDBError.code)

    expect(expectedKeys).toEqual(enumKeysDeclared)
  })

  it('should have all the code values', () => {
    const expectedValues = [
      11000,
      1
    ]

    const enumValuesDeclared = Object.values(MongoDBError.code)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})
