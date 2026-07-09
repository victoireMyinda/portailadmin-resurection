import { useEffect, useMemo } from 'react'
import { TextInput, type TextInputProps } from 'react-admin'
import { useFormContext, useWatch } from 'react-hook-form'
import { resolveLiveEmbedUrl } from '../live-stream/live-embed'

type LiveEmbedUrlInputProps = Omit<TextInputProps, 'source'> & {
  embedSource: string
  watchSource: string
  platformIdSource?: string
  autoplayWhenLive?: boolean
}

export function LiveEmbedUrlInput({
  embedSource,
  watchSource,
  platformIdSource,
  autoplayWhenLive = false,
  helperText,
  ...props
}: LiveEmbedUrlInputProps) {
  const { setValue } = useFormContext()
  const watchUrl = String(useWatch({ name: watchSource }) ?? '')
  const embedUrl = String(useWatch({ name: embedSource }) ?? '')
  const platformId = platformIdSource ? String(useWatch({ name: platformIdSource }) ?? '') : 'youtube'
  const isLive = autoplayWhenLive ? Boolean(useWatch({ name: 'isLive' })) : false

  const suggested = useMemo(
    () =>
      resolveLiveEmbedUrl(watchUrl, '', platformId, {
        autoplay: isLive,
      }),
    [watchUrl, platformId, isLive],
  )

  useEffect(() => {
    if (!suggested) return
    const resolved = resolveLiveEmbedUrl(watchUrl, embedUrl, platformId, { autoplay: isLive })
    if (resolved && resolved !== embedUrl) {
      setValue(embedSource, resolved, { shouldDirty: true, shouldValidate: true })
    }
  }, [watchUrl, embedUrl, platformId, isLive, suggested, embedSource, setValue])

  const hint =
    suggested && suggested !== embedUrl
      ? `Généré automatiquement depuis le lien YouTube : ${suggested}`
      : suggested
        ? 'URL d’intégration détectée depuis le lien YouTube.'
        : 'Pour YouTube, l’URL embed est créée automatiquement à partir du lien. Facebook et TikTok ouvrent la plateforme externe.'

  return (
    <TextInput
      source={embedSource}
      helperText={helperText ? `${helperText} ${hint}` : hint}
      fullWidth
      {...props}
    />
  )
}
