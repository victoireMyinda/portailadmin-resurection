import { initializeApp } from 'firebase-admin/app'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { defineSecret, defineString } from 'firebase-functions/params'
import nodemailer from 'nodemailer'

initializeApp()

const gmailUser = defineSecret('GMAIL_USER')
const gmailAppPassword = defineSecret('GMAIL_APP_PASSWORD')
const notifyEmail = defineString('NOTIFY_EMAIL', { default: '' })

export const onVisitorMessageCreated = onDocumentCreated(
  {
    document: 'visitorMessages/{messageId}',
    secrets: [gmailUser, gmailAppPassword],
    region: 'europe-west1',
  },
  async (event) => {
    const data = event.data?.data()
    if (!data) return

    const { name, phone, message, createdAt } = data
    const user = gmailUser.value()
    const pass = gmailAppPassword.value()
    const recipient = notifyEmail.value() || user

    if (!user || !pass || !recipient) {
      console.error('GMAIL_USER, GMAIL_APP_PASSWORD ou NOTIFY_EMAIL non configurés')
      return
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    const dateLabel = createdAt
      ? new Date(createdAt).toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' })
      : '—'

    await transporter.sendMail({
      from: `"Paroisse Résurrection" <${user}>`,
      to: recipient,
      replyTo: recipient,
      subject: `[Portail] Nouveau message de ${name}`,
      text: [
        'Nouveau message depuis le portail public',
        '',
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        `Reçu le : ${dateLabel}`,
        '',
        'Message :',
        message,
        '',
        '— Consultez aussi la rubrique Messages dans l’administration.',
      ].join('\n'),
      html: `
        <h2>Nouveau message visiteur</h2>
        <p><strong>Nom :</strong> ${escapeHtml(String(name))}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(String(phone))}</p>
        <p><strong>Reçu le :</strong> ${escapeHtml(dateLabel)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(String(message))}</p>
        <hr />
        <p style="color:#666;font-size:12px">Rubrique Messages — administration paroissiale</p>
      `,
    })
  },
)

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
