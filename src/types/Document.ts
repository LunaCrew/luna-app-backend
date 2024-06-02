import { InsertOneResult } from 'mongodb'

export type CreateDocument = InsertOneResult<Document>
