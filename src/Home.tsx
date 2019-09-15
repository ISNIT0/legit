import React from 'react';
import axios from 'axios';
import { Router, Route } from './Router';

interface HomeProps {
    router: Router
}


export class Home extends React.Component<HomeProps, { url?: string }> {
    render() {
        const { router } = this.props;
        return <div className="home" >
            <h2>sarky fact checker</h2>
            <input type="text" name="" id="" placeholder="article url" onInput={(ev: any) => {
                this.setState({ ...this.state, url: ev.target.value });
            }} />
            <br />
            <button onClick={async () => {
                router.pushRoute({ key: 'checkUrl', data: { url: this.state.url } });
            }}>fact check</button>
            <br />
            <button disabled>share fact check url</button>
        </div>
    }
}
