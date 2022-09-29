import { Fragment, useEffect, useRef, useState } from 'react'
import TimeAgo from 'timeago-react'
import io from 'socket.io-client'
import { Message } from './components/message'

const SERVER_URI = `http://localhost:3030`

const socket = io.connect(SERVER_URI)

//

export const App = () => {
  const [chatHistory, setChatHistory] = useState([])
  const messageInput = useRef()

  const handleClickSend = event => {
    event.preventDefault()
    if (!messageInput.current) {
      return
    }
    const message = messageInput.current.value
    socket.emit('message_from_client', message)
    messageInput.current.value = ''
  }

  useEffect(() => {
    socket.on('new_message_broadcast', data => {
      setChatHistory([data, ...chatHistory])
    })
  }, [chatHistory])

  return (
    <Fragment>
      <header>
        websockets with socket.io!
      </header>

      <main>
        <p>
          Lorem ipsum voluptate cupidatat in velit aute aute
          incididunt ut sit in ea exercitation eu consectetur
          dolore incididunt consectetur.
        </p>
        <form onSubmit={ handleClickSend }>
          <input placeholder="enter message..." ref={ messageInput } />
          <input type="submit" value="send!" />
        </form>

        <hr />

        {
          chatHistory.map(data => (
            <Message
             key={ `${ data.userId }-${ data.timestamp }` }
             data={ data }
            />
          ))
        }
      </main>

      <footer>
        &copy; { new Date().getFullYear() }
      </footer>
    </Fragment>
  )
}

