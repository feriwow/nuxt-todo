import { createServer } from 'http'
import { builder } from '@netlify/functions'
import app from '../../server.js'  // Adjust this path as needed

const server = createServer(app)

export const handler = builder(server)