export const formatTime = (time) => {
    const formattedTime = new Date(`2000-01-01T${time}`);
    return formattedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
