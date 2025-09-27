export default async function onRequest(context) {
  const a = [1, 3, 4, 6, 8]
  // console.log(context);
  const params = context.params.default
  let url = ''
  let name = ''
  if(typeof params === 'string') {
    name = params
  } else {
    name = params.join('/')
  }
  console.log(name);
  if(name.includes('price')) {
    url = `https://cf.981001.xyz/${a[Math.floor(Math.random() * a.length)]}/${name.split('/').pop().replace('fkh', '.')}`
  } else {
    url = `https://cf.981001.xyz/${a[Math.floor(Math.random() * a.length)]}/remoteCode/${name.split('/').pop().replace('fkh', '.')}`
  }
  console.log(url);
  const response = await fetch(url);
  const text = await response.text();
  // console.log(text);
  return new Response(text);
  // http://cf.981001.xyz/8/price1.txt
  // return new Response(str);
}