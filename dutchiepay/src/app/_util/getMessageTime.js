const getMessageTime = ({ index, messages }) => {
  const shouldShowTime = (index) => {
    if (index === 0) return true;
    if (
      messages[index].type === 'ban' ||
      messages[index].type === 'enter' ||
      messages[index].type === 'out' ||
      messages[index].type === 'mout'
    ) {
      return false;
    }
    if (index < messages.length) {
      if (index === messages.length - 1) {
        return true;
      } else {
        if (messages[index].date === messages[index + 1].date) {
          if (messages[index].senderId === messages[index + 1].senderId) {
            if (messages[index].time === messages[index + 1].time) return false;
          }
        }
      }
      return true;
    }
  };

  return shouldShowTime(index);
};

export default getMessageTime;
