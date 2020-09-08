import React from 'react'

const Notification = ({message}) => {
    console.log("Notification", message)
    if (message.text === null) {
        console.log("returning null")
        return null
    }

    return (
        <div className= {message.type}>
            {message.text}
        </div>
    )
}

export default Notification