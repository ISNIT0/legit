import React from 'react'
import axios from 'axios'
import { Router, Route } from './Router'

interface HomeProps {
  router: Router
}

export class Home extends React.Component<HomeProps, { url?: string }> {
  render() {
    const { router } = this.props
    return (
      <div className='home'>
        <h2>Is this article legit?</h2>
        <input
          type='text'
          name=''
          id=''
          placeholder='Paste your link here'
          onInput={(ev: any) => {
            this.setState({ ...this.state, url: ev.target.value })
          }}
        />
        <br />
        <button
          className='checkbutton'
          onClick={async () => {
            router.pushRoute({ key: 'checkUrl', data: { url: this.state.url } })
          }}>
          check it
        </button>
        <br />
      </div>
    )
  }
}
