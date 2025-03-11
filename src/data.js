import moment from "moment";

export const Api_Key = 'AIzaSyAk5ww8hp74njrrjxDAVx-sxj1A-6Fl1HE';

const Converter = (value) => {
  if(value > 1000000) {
    return Math.floor(value/1000000) + 'M';
  }
  else if(value >= 1000) {
    return Math.floor(value/1000) + 'K';
  }
  else {
    return value;
  }
}

// Normally General function is an Synchronous function....while making it Promise(asynchronous)  mention "async" before it in order to use "await"
export async function FilterVideos(data) {
  const filteredItems = await Promise.all(
    data.items.map(async (item) => {
      const durationStr = item.contentDetails.duration;
      const durationOBJ = moment.duration(durationStr);
      const durationInSec = durationOBJ.asSeconds();

      if(durationInSec > 50) {
        return item;
      }
      return null;
    })
  );

  return filteredItems.filter(item => item !== null);
}

export function GoToTop() {
  window.scrollTo({
    top : '0',
    behavior : 'smooth'
  })
}

export default Converter;