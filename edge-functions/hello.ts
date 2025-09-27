export default function onRequest(context) {
  // console.log(context);
  const str = JSON.stringify(context);
  return new Response(str);
}