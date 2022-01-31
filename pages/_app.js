function GlobalStyle() {
    return (
      <style global jsx>{`

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }

        body {
          font-family: 'Montserrat', sans-serif;
        }

        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }

        #__next {
          flex: 1;
        }

        #__next > * {
          flex: 1;
        }

      `}</style>
    );
}


// Every page of the hole app will render these components, the global reset style will be applied to all pages.

export default function MyApp({ Component, pageProps }) {
    return(
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}