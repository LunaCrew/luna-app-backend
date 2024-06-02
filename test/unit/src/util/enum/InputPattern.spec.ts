import InputPattern from 'src/util/enum/InputPattern'

describe(':: Util :: Enum :: InputPattern ::', () => {
  it('should allow only passwords that mach the pattern', () => {
    expect(RegExp(InputPattern.PASSWORD).exec('Abcd123*')).toBeTruthy()
    expect(RegExp(InputPattern.PASSWORD).exec('aaaaaaaa')).toBeFalsy()
    expect(RegExp(InputPattern.PASSWORD).exec('AAAAAAAA')).toBeFalsy()
    expect(RegExp(InputPattern.PASSWORD).exec('12345678')).toBeFalsy()
    expect(RegExp(InputPattern.PASSWORD).exec('********')).toBeFalsy()
    expect(RegExp(InputPattern.PASSWORD).exec('Aaaaaaaa')).toBeFalsy()
    expect(RegExp(InputPattern.PASSWORD).exec('A1aaaaaa')).toBeFalsy()
  })

  it('should allow only dates that mach the iso pattern', () => {
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23:45-0300')).toBeTruthy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23:45Z')).toBeTruthy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23:45z')).toBeTruthy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23:45-03:00')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23:45-03:00:00')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23:45')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15:23')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T15')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31T')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023-12-31')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('2023/12/31')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023T')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023T15')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023T15:23')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023T15:23:00')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023T15:23:00-03:00:00')).toBeFalsy()
    expect(RegExp(InputPattern.DATE_TIME_TIMEZONE).exec('31/12/2023T15:23:00-03:00')).toBeFalsy()
  })
})
