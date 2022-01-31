import React from 'react';
import Head from 'next/head';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

export default function PaginaInicial() {

  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [checkedUser, setCheckUser] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const getGHUserData = async (githubUsername) => {
    if (githubUsername.length >= 1) {
      const userObjInfo = await fetch(`https://api.github.com/users/${githubUsername}`);
      const convertedInfo = await userObjInfo.json();
      return setUserInfo(convertedInfo);
    }
  }

  return (
    <>

      {/* Head Element */}
      <Head>
        <title>Login Page | {appConfig.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>



      {/* Main container */}
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals['700'],
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >



        {/* Points Container */}
        <Box
          styleSheet={{
            width: '100%', maxWidth: '100px',
            height: '520px',
            borderRadius: '10px 0px 0px 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals['900'],
          }}
        >
          <h1 style={{
            transform: 'rotate(90deg)',
            color: appConfig.theme.colors.neutrals['000'],
            fontSize: '20px', width: 'auto'
          }}>
            {checkedUser ? userInfo.public_repos : '-'} points
          </h1>
        </Box>
        {/* Points Container */}


        {/* User Container */}
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%', maxWidth: '700px',
            maxHeight: '500px',
            borderRadius: '0px 5px 5px 0px', padding: '32px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals['800'],
          }}
        >



          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px', width: '100%',
              padding: '16px',
              marginBottom: '20px',
              backgroundColor: appConfig.theme.colors.neutrals['800'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['999'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >

            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px'
              }}
              src={checkedUser ? userInfo.avatar_url : 'https://freepngimg.com/thumb/assassin_creed_syndicate/22941-1-assassin-creed-syndicate-hd-thumb.png'}
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>

          </Box>
          {/* Photo Area */}



          {/* Form */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault()
              router.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Welcome to the <br /> {appConfig.name} </Title>

            <hr style={{ width: '500px', height: '0px', padding: '0px', margin: '25px', borderStyle: 'solid', borderColor: appConfig.theme.colors.neutrals['700'] }}></hr>

            <Box
              as="div"
              styleSheet={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}>

              <TextField
                value={username}
                styleSheet={{ width: '318px', position: 'relative', left: '20px' }}
                onChange={(event) => { setUsername(event.target.value) }}
                onKeyPress={(event) => {
                  // If the checkedUser is false, the enter key runs the check button, if true, runs the join button
                  if (event.code === 'Enter' && checkedUser == false) {
                    event.preventDefault();
                    getGHUserData(username);
                    if (userInfo.hasOwnProperty('id')) { setCheckUser(true) }
                  }
                }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals['200'],
                    mainColor: (checkedUser ? 'green' : appConfig.theme.colors.neutrals['900']),
                    mainColorHighlight: (checkedUser ? 'green' : appConfig.theme.colors.primary['500']),
                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                  },
                }}
              ></TextField>

              <button
                type="button"
                label="Check"
                colorVariant="positive"
                rounded='sm'
                size='xs'
                onClick={() => {
                  getGHUserData(username);
                  if (userInfo.hasOwnProperty('id')) { setCheckUser(true) }
                }}
                style={{
                  position: 'relative', bottom: '4px', right: '33px',
                  padding: '4px', margin: '0px', backgroundColor: 'green',
                  border: 'none', borderRadius: '2px',
                  fontFamily: 'Montserrat', fontWeight: '500', fontSize: '11px', color: 'white'
                }}
              >Check</button>
            </Box>

            <Button
              type='submit'
              disabled={!checkedUser}
              label='Join'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary["200"],
                mainColorLight: appConfig.theme.colors.primary["300"],
                mainColorStrong: appConfig.theme.colors.primary["300"],
              }}
            />
          </Box>
          {/* Form */}



        </Box>
      </Box>
    </>
  );
}

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
    </>
  );
}