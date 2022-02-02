import appConfig from '../config.json'

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

        * {
          scrollbar-width: thin;
          scrollbar-color: ${appConfig.theme.colors.neutrals['000']} ${appConfig.theme.colors.neutrals['000']};
        }

        *::-webkit-scrollbar {
          width: 5px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${appConfig.theme.colors.primary['000']};
          border-radius: 20px;

        }

      `}</style>
  );
}


// Every page of the hole app will render these components, the global reset style will be applied to all pages.

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}