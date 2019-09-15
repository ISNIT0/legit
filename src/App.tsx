import React from 'react';
import axios from 'axios';
import { Router, Route } from './Router';
import { routes } from './routes';

class App extends React.Component {

  // componentDidMount() {
  // }

  // async scoreArticle(url: string) {
  //   const glitchedMeta = await getJSON<any>(`http://localhost:1337/?url=${encodeURIComponent(url)}`);
  //   const structuredDataMult = 39 / 100;
  //   const sentiment = glitchedMeta.content.sentiment.overall.neutral;
  //   const blacklist = glitchedMeta.blacklists.trustIndicators.negative.length ? -100 : 100;
  //   const factcheck = (glitchedMeta.factchecks.trustIndicators.positive.length * 50) + (glitchedMeta.factchecks.trustIndicators.negative.length * -100);
  //   const related = glitchedMeta.related.trustIndicators.positive.length * 50;
  //   const structuredData = 39 - glitchedMeta['structured-data'].testResults.failed * structuredDataMult;
  //   return {
  //     sentiment,
  //     blacklist,
  //     factcheck,
  //     related,
  //     structuredData,
  //     score: (sentiment + blacklist + factcheck + related + structuredData) / 5,
  //   };
  // }

  render() {
    let initRoute: Route = {
      key: 'home'
    }
    return <div className="App" >
      <Router
        routes={routes}
        initRoutes={[initRoute]}
      />
    </div>
  }
}

export default App;
