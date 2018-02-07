import React from 'react';
import Head from 'next/head';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
    };
  }

  onAnswerChange(e) {
    this.setState({answer: e.target.value});
  }

  render() {
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" />
          <script defer src="https://use.fontawesome.com/releases/v5.0.0/js/all.js" />
        </Head>
        {/* UNCOMMENT ME TO BREAK A TEST <style jsx>{`
          input:focus {
            border-color: #3ac751;
          }
        `}</style> */}
        <section className="section">
          <div className="container">
            <h1 className="title">Hello World</h1>
            <p className="subtitle">
              My first website with <strong>Bulma</strong>!
            </p>

            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="What's the word?"
                value={this.state.answer}
                onChange={e => this.onAnswerChange(e)}
              />
            </div>

            {this.state.answer && this.state.answer.length > 0 && <div>You have entered: {this.state.answer}</div>}
          </div>
        </section>
      </div>
    );
  }
}
