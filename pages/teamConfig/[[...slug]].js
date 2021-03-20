import { useRouter } from 'next/router'
import NewTeam from '../newteam'

export default function Post ({data}) {
  const router = useRouter()
  const { slug } = router.query
  return <div>
    <p>Post: {slug}</p>
    <NewTeam data={data}></NewTeam>
  </div>
}

Post.getInitialProps = async (ctx) => {
  var myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", "c6c5ead4f76549e5bc06ed2971336fc0");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let list = []
  let jsonList = []
  for(let i=1;i<4;i++){
    let id=i
    const res = await fetch(`https://api.football-data.org/v2/players/${id}`, requestOptions)
    const json = await res.json()
    jsonList.push(json)
  }
  console.log(jsonList)
  jsonList.map((player) => {
    list.push(player.name)
  })
  console.log(list)
  
  return{ data: list}
}