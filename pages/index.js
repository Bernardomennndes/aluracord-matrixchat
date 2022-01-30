import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';


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

export default function PaginaInicial() {

  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [userPoints, setUserPoints] = React.useState('-')

  // React.useEffect( () => {
  //   setTimeout( () => {
  //   fetch(`https://api.github.com/users/${username}`)
  //   .then((userInfo) => {return userInfo.json()})
  //   .then(({ public_repos }) => { public_repos ? setUserPoints(public_repos) : '-' })
  // } , 2000)}, [username])

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals['700'],
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >

        <Box
          styleSheet={{
            width: '100%', maxWidth: '100px',
            height: '520px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals['900'],
          }}

        >
          <Text styleSheet={{
            transform: 'rotate(90deg)',
            color: appConfig.theme.colors.neutrals['000'],
            fontSize: '20px', width: 'auto'
          }}>
            {userPoints} points
          </Text>
        </Box>

        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%', maxWidth: '700px',
            maxHeight: '500px',
            borderRadius: '5px', padding: '32px', margin: '16px',
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
              src={`https://github.com/${username}.png`}
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
            <Title tag="h2">Welcome to the fallen matrix source code</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(event) => { setUsername(event.target.value) }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals['200'],
                  mainColor: appConfig.theme.colors.neutrals['900'],
                  mainColorHighlight: appConfig.theme.colors.primary['500'],
                  backgroundColor: appConfig.theme.colors.neutrals['800'],
                },
              }}
            />
            <Button
              type='submit'
              label='Join'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Form */}



        </Box>
      </Box>
    </>
  );
}