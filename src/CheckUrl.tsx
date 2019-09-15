import React from 'react'
import axios from 'axios'
import { Router, Route } from './Router'
import { ReactComponent as HTTPSIlloSuccess } from './images/HTTPS-success.svg'
import { ReactComponent as HTTPSIlloFail } from './images/HTTPs-fail.svg'

interface RouteProps {
  router: Router
  route: Route
  prefetchedData: any
}

class Secure extends React.Component<RouteProps> {
  render() {
    const data = this.props.route.data
    const isSuccess = data.content.trustIndicators.positive.find(
      (a: any) => a.text === 'URL is encrypted (uses HTTPS)'
    )
    return (
      <div>
        <h1>Is the URL secure?</h1>
        {isSuccess ? <HTTPSIlloSuccess /> : <HTTPSIlloFail />}
        {isSuccess ? (
          <h2 className='success'>YES</h2>
        ) : (
          <h2 className='fail'>NO</h2>
        )}
        <p className='description'>
          It looks like the URL you entered uses HTTPS and is secure. This is a
          good sign that the publisher is reputable.
        </p>
        <button
          className='checkbutton'
          onClick={() => {
            this.props.router.pushRoute({ key: 'isNewsArticle', data })
          }}>
          Check it
        </button>
      </div>
    )
  }
}

class IsNewsArticle extends React.Component<RouteProps> {
  render() {
    const data = this.props.route.data
    const isSuccess = data.content.trustIndicators.positive.find(
      (a: any) => a.text === 'URL is encrypted (uses HTTPS)'
    )
    return (
      <>
        <h1>Does the page identify as a news article?</h1>
        {isSuccess ? <HTTPSIlloSuccess /> : null}
        {isSuccess ? (
          <h2 className='success'>YES</h2>
        ) : (
          <h2 className='fail'>NO</h2>
        )}
        <p className='description'>
          The article does call itself a news article. (Rather than a blog or
          social post)
        </p>
        <button
          className='checkbutton'
          onClick={() => {
            this.props.router.pushRoute({ key: 'isDisputed', data })
          }}>
          Check it
        </button>
      </>
    )
  }
}

class IsDisputed extends React.Component<RouteProps> {
  render() {
    const data = this.props.route.data
    const isSuccess = data.factchecks.trustIndicators.positive.find(
      (a: any) => a.text === 'No related articles found on fact checking sites'
    )
    return (
      <>
        <h1>Are people questioning the article?</h1>
        {isSuccess ? <HTTPSIlloSuccess /> : null}
        {isSuccess ? (
          <h2 className='success'>YES</h2>
        ) : (
          <h2 className='fail'>NO</h2>
        )}
        <p className='description'>
          No fact checking sites (e.g. fullfact.org) seem to have written about
          this article. That’s usually a good sign
        </p>
        <button
          className='checkbutton'
          onClick={() => {
            this.props.router.pushRoute({ key: 'relatedArticles', data })
          }}>
          Check it
        </button>
      </>
    )
  }
}

class AreRelatedArticles extends React.Component<RouteProps> {
  render() {
    const data = this.props.route.data
    const isSuccess = data.related.trustIndicators.positive.find(
      (a: any) => a.text === 'Multiple related articles found'
    )
    return (
      <>
        <h1>Other similar articles from other publishers?</h1>
        {isSuccess ? <HTTPSIlloSuccess /> : null}
        {isSuccess ? (
          <h2 className='success'>YES</h2>
        ) : (
          <h2 className='fail'>NO</h2>
        )}
        <p className='description'>
          Looks like a lot of outlets are reporting similar stories. You can
          check by searching the title online.
        </p>
        <button
          className='checkbutton'
          onClick={() => {
            this.props.router.pushRoute({ key: 'articleSentiment', data })
          }}>
          Check it
        </button>
      </>
    )
  }
}

class ArticleSentiment extends React.Component<RouteProps> {
  render() {
    const data = this.props.route.data
    const isSuccess = data.content.sentiment.body.neutral > 70
    return (
      <>
        <h1>Is the article neutral?</h1>
        {isSuccess ? <HTTPSIlloSuccess /> : null}
        {isSuccess ? (
          <h2 className='success'>YES</h2>
        ) : (
          <h2 className='fail'>NO</h2>
        )}
        <p className='description'>
          {data.content.sentiment.body.neutral}% of the article was neutral.
        </p>
      </>
    )
  }
}

const checkRoutes = {
  secure: { component: Secure },
  isNewsArticle: { component: IsNewsArticle },
  isDisputed: { component: IsDisputed },
  relatedArticles: { component: AreRelatedArticles },
  articleSentiment: { component: ArticleSentiment },
}

export class CheckUrl extends React.Component<RouteProps, { url?: string }> {
  render() {
    const { router } = this.props
    return (
      <div className='check-url'>
        <Router
          initRoutes={[{ key: 'secure', data: this.props.prefetchedData }]}
          routes={checkRoutes}
        />
      </div>
    )
  }
}
