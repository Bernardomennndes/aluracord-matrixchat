import React from 'react';
import Head from 'next/head'
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { SendStickerButton } from '../src/components/SendStickerButton'
import { Box, Text, TextField, Image, Button } from '@skynexui/components';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwODExNywiZXhwIjoxOTU4ODg0MTE3fQ.kqycgG4fkR67QFmtVYkjW3jFTR64JwhMq0nGU1GVdsQ'
const SUPABASE_URL = 'https://uxuraoytcntbrywwdqsm.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const realTimeNewMessageListener = (addMessage) => {
    return supabaseClient
        .from('messages')
        .on('INSERT', (autoResponse) => {
            addMessage(autoResponse.new);
        }).subscribe();
}

export default function ChatPage() {

    const router = useRouter();
    const loggedUser = router.query.username;

    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    // Unable the React 'ChatPage' component of reloading everytime the page changes, only when messageList is altered.
    React.useEffect(() => {
        //  Call all the messages from the data base.
        supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => { setMessageList(data) })

        realTimeNewMessageListener((newMessage) => {
            setMessageList((currentListValue) => { return [newMessage, ...currentListValue] });
        });
    }, [])


    const handleNewMessage = (newMessage) => {
        const messageInfo = {
            text: newMessage,
            from: loggedUser,
        }

        supabaseClient
            .from('messages')
            .insert([messageInfo])
            .order('id', { ascending: false })
            .then()

        setMessage('');
    }

    return (
        <>
            <Head>
                <title>Chat Page | {loggedUser}</title>
                <script src="https://kit.fontawesome.com/5ab8e2c394.js" crossorigin="anonymous"></script>
            </Head>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals['100'],
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    color: appConfig.theme.colors.neutrals['000'],
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals['300'],
                        height: '100%',
                        maxWidth: '95%',
                        maxHeight: '95vh',
                        padding: '32px',
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals['200'],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >

                        <MessageList messages={messageList} />

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${appConfig.theme.colors.primary['000']}`,
                                borderRadius: '5px',
                                backgroundColor: appConfig.theme.colors.neutrals['600']
                            }}
                        >
                            <TextField
                                value={message}
                                onChange={(event) => {
                                    setMessage(event.target.value)
                                }}
                                onKeyPress={(event) => {
                                    if (event.code === 'Enter') {
                                        event.preventDefault();
                                        handleNewMessage(message);
                                    }
                                }}
                                placeholder="Type your message here..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals['600'],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals['100'],
                                }}
                            />
                            <SendStickerButton
                                onStickerClick={(sticker) => {
                                    handleNewMessage(`:sticker: ${sticker}`)
                                }}
                            />
                            <button type='button' style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '5px',
                                color: appConfig.theme.colors.primary['000'],
                                hover: {color: appConfig.theme.colors.primary['500']}
                            }}>
                                <i class="fas fa-angle-double-right fa-2x"></i>
                            </button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <text variant='heading5' styleSheet={{ textAlign: 'center' }}>
                    Chat
                </text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList(props) {

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((messageObj) => {
                return (
                    <Text
                        key={messageObj.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[400],
                            },
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex', alignItems: 'center', justifyContent: 'left',
                                marginBottom: '8px',
                            }}
                        >

                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    border: `1px solid ${appConfig.theme.colors.primary['000']}`,
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${messageObj.from}.png`}
                            />

                            <text tag="strong" style={{color: appConfig.theme.colors.neutrals['050']}}>
                                | {messageObj.from}
                            </text>

                            <text
                                style={{
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.primary['600'],
                                }}
                                tag="span"
                            >
                                {/* Database timeStamp model example: 2022-01-27T22:03:48.000Z */}
                                {/* Convert to 'Date / Month / Year - Hour:Minute' using replace method and Regex*/}
                                {messageObj.timeStamp.replace(/(\d{4})-(\d{2})-(\d{2})T(.{5}).*/, '$3 / $2 / $1 - $4')}
                            </text>

                        </Box>         
                            {messageObj.text.startsWith(':sticker:') ? <Image src={messageObj.text.replace(':sticker: ', '')} /> : <p style={{fontSize: '14px', paddingLeft: '15px'}}>{messageObj.text}</p>}
                        
                    </Text>
                )
            })}
        </Box>
    )
}