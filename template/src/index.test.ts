import crypto from 'crypto'

beforeAll(() => {
  vi.stubGlobal('crypto', crypto)
})

describe('{{ namespace }}', () => {
  it('example test', () => {
    expect(true).toEqual(true)
  })
})
