import React from 'react';
import axios from 'axios';
import { Router, Route } from './Router';

interface RouteProps {
    router: Router
    route: Route
    prefetchedData: any
}



class Secure extends React.Component<RouteProps> {
    render() {
        const data = this.props.route.data;
        const isSuccess = data.content.trustIndicators.positive.find((a: any) => a.text === 'URL is encrypted (uses HTTPS)');
        return <>
            <h1>Is the URL secure?</h1>
            <pre>
                Illustration
                Goes
                Here
            </pre>
            <h1>{isSuccess ? 'YES' : 'NO'}</h1>
            <p>It looks like the url you entered is secure
(uses HTTPS)
This is a sign that the publisher is reputable</p>
            <button onClick={() => {
                this.props.router.pushRoute({ key: 'isNewsArticle', data });
            }}>next</button>
        </>
    }
}

class IsNewsArticle extends React.Component<RouteProps> {
    render() {
        const data = this.props.route.data;
        const isSuccess = data.content.trustIndicators.positive.find((a: any) => a.text === 'URL is encrypted (uses HTTPS)');
        return <>
            <h1>Does the page identify as a news article?</h1>
            <pre>
                Illustration
                Goes
                Here
            </pre>
            <h1>{isSuccess ? 'YES' : 'NO'}</h1>
            <p>The article does call itself a news article. (Rather than a blog or social post)</p>
            <button onClick={() => {
                this.props.router.pushRoute({ key: 'isDisputed', data });
            }}>next</button>
        </>
    }
}

class IsDisputed extends React.Component<RouteProps> {
    render() {
        const data = this.props.route.data;
        const isSuccess = data.factchecks.trustIndicators.positive.find((a: any) => a.text === 'No related articles found on fact checking sites');
        return <>
            <h1>Are people questioning the article?</h1>
            <pre>
                Illustration
                Goes
                Here
            </pre>
            <h1>{isSuccess ? 'YES' : 'NO'}</h1>
            <p>No fact checking sites (e.g. fullfact.org) seem to have written about this article. That’s usually a good sign</p>
            <button onClick={() => {
                this.props.router.pushRoute({ key: 'relatedArticles', data });
            }}>next</button>
        </>
    }
}

class AreRelatedArticles extends React.Component<RouteProps> {
    render() {
        const data = this.props.route.data;
        const isSuccess = data.related.trustIndicators.positive.find((a: any) => a.text === 'Multiple related articles found');
        return <>
            <h1>Other similar articles from other publishers?</h1>
            <pre>
                Illustration
                Goes
                Here
            </pre>
            <h1>{isSuccess ? 'YES' : 'NO'}</h1>
            <p>Looks like a lot of outlets are reporting similar stories. You can check by searching the title online.</p>
            <button onClick={() => {
                this.props.router.pushRoute({ key: 'articleSentiment', data });
            }}>next</button>
        </>
    }
}

class ArticleSentiment extends React.Component<RouteProps> {
    render() {
        const data = this.props.route.data;
        const isSuccess = data.content.sentiment.body.neutral > 70;
        return <>
            <h1>Is the article neutral?</h1>
            <pre>
                Illustration
                Goes
                Here
            </pre>
            <h1>{isSuccess ? 'YES' : 'NO'}</h1>
            <p>{data.content.sentiment.body.neutral}% of the article was neutral.</p>
        </>
    }
}

const checkRoutes = {
    secure: { component: Secure },
    isNewsArticle: { component: IsNewsArticle },
    isDisputed: { component: IsDisputed },
    relatedArticles: { component: AreRelatedArticles },
    articleSentiment: { component: ArticleSentiment },
};

export class CheckUrl extends React.Component<RouteProps, { url?: string }> {
    render() {
        const { router } = this.props;
        return <div className="check-url" >
            <Router
                initRoutes={[{ key: 'secure', data: this.props.prefetchedData }]}
                routes={checkRoutes}
            />
        </div>
    }
}
