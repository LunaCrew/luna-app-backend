import { CreateDocument } from 'src/types/Document'
import { ObjectId } from 'mongodb'

describe('Document', () => {
  it('should have the correct type', () => {
    const objectId = new ObjectId('660c44833d344e660b031f14')
    const document: CreateDocument = {
      acknowledged: true,
      insertedId: objectId
    }

    expect(document.acknowledged).toBe(true)
    expect(document.insertedId).toEqual(objectId)
  })
})
