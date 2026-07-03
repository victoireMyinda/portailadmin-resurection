#!/usr/bin/env node
/**
 * Affiche la commande pour appliquer le CORS du bucket Storage (requis pour upload depuis localhost).
 * Remplacer BUCKET par la valeur de VITE_FIREBASE_STORAGE_BUCKET dans .env
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
let bucket = process.env.VITE_FIREBASE_STORAGE_BUCKET ?? ''

try {
  const env = readFileSync(join(root, '.env'), 'utf8')
  const match = env.match(/^VITE_FIREBASE_STORAGE_BUCKET=(.+)$/m)
  if (match) bucket = match[1].trim()
} catch {
  // .env optionnel
}

if (!bucket) {
  bucket = 'paroisseresurection-data.firebasestorage.app'
}

const gsBucket = bucket.startsWith('gs://') ? bucket : `gs://${bucket}`

console.log(`
=== Firebase Storage — CORS localhost ===

1. Règles Storage déployées (firebase deploy --only storage)

2. Appliquez le CORS sur le bucket (une seule fois) :

   gcloud storage buckets update ${gsBucket} --cors-file=storage.cors.json

   ou avec gsutil :

   gsutil cors set storage.cors.json ${gsBucket}

3. Vérifiez que Storage est activé dans la console Firebase :
   https://console.firebase.google.com/project/paroisseresurection-data/storage

4. Relancez l'admin (npm run dev) et réessayez l'import.

Sans CORS Storage, l'import utilise un repli : image compressée enregistrée
directement dans Firestore (fonctionne en local, limite ~900 Ko par photo).
`)
