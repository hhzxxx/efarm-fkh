export default async function onRequest(context) {
  // console.log(context);
  const params = context.params.default
  let name = ''
  if(typeof params === 'string') {
    name = params
  } else {
    name = params.join('/')
  }
  console.log(name);
  const text = await getPrice(name,0);
  return new Response(text);
}

const getPrice = async (name,errorTimes = 0) => {
  if(errorTimes > 3) {
    return '';
  }
  try {
    let url = '';
    const a = [1, 3, 4, 6, 8]
    if(name.includes('price')) {
      url = `https://cf.981001.xyz/${a[Math.floor(Math.random() * a.length)]}/${name.split('/').pop().replace('fkh', '.')}`
    } else {
      url = `https://cf.981001.xyz/${a[Math.floor(Math.random() * a.length)]}/remoteCode/${name.split('/').pop().replace('fkh', '.')}`
    }
    console.log(url);
    const response = await fetch(url);
    const text = await response.text();
    return text;
  }catch(error) {
    return getPrice(name,errorTimes + 1);
  }
}