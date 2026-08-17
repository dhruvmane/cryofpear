// ALL Logic Related Functions in this JS File.

function formatDateTime() {
  const now = new Date();

  // Time components
  let hours = now.getHours().toString();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  hours = (parseInt(hours) % 12 || 12).toString().padStart(2, '0');

  // Date components
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  return `${hours}:${minutes}:${seconds} ${ampm} on ${dayName}, ${date} of ${month}, ${year}`;
}


export { formatDateTime as GetTime }