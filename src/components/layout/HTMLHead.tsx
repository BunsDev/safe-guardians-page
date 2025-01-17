import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

interface IHeadProps {
  title?: string
  description?: string
  thumbnail?: string
  article?: boolean
}

const getTitle = (title?: string) =>
  title ? `${title} - Safe Guardians` : 'Safe Guardians'

export default ({ title, description, thumbnail, article }: IHeadProps) => (
  <StaticQuery
    query={QueryHead}
    render={({
      site: {
        siteMetadata: {
          site,
          defaultDescription,
          language,
          siteUrl,
          color,
          twitter,
        },
      },
    }) => {
      const seo = {
        description: description || defaultDescription,
        image: thumbnail || `${siteUrl}/images/og-image.png`,
        url: `${siteUrl}`,
        twitter,
      }
      const generatedTitle = getTitle(title)

      return (
        <Helmet title={generatedTitle}>
          <html lang={language} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          ></meta>
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          <meta name="theme-color" content={color} />
          <meta name="application-name" content={site} />
          <link rel="canonical" href={seo.url} />

          <meta property="og:url" content={seo.url} />
          <meta property="og:title" content={generatedTitle} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.image} />
          {article && <meta property="og:type" content="article" />}

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content={site} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />

          <meta name="twitter:creator" content={seo.twitter} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={generatedTitle} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
          <meta name="twitter:url" content={seo.url} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon.ico"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Helmet>
      )
    }}
  />
)

const QueryHead = graphql`
  query QueryHead {
    site {
      siteMetadata {
        site
        siteUrl
        defaultDescription: description
        language
        color
        twitter
      }
    }
  }
`
