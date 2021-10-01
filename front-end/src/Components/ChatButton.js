const ChatButton = ({ onClick = null, children = null }) => {
    return (
  <button onClick={onClick}>{children}</button>)
};


export default ChatButton