const fetchMusic = async (query) => {
  //?Step 1 => Prendere tutti i risultati
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
  )
  let { data } = await res.json()
  // {data} ===> decostruzione! E' l'equivalente di fare
  /*
          const music = await res.json()
          const data = music.data
      */
  //? Step 2 => Isolare gli album
  // const albums = data.map(song => song.album) //andrebbe bene per inserire TUTTI gli album, inclusi i doppioni
  //per rendere gli album unici:
  const albums = []
  data.forEach((song) => {
    let soloId = albums.map((album) => album.id) // crea un array di id
    if (!soloId.includes(song.album.id)) {
      albums.push(song.album)
    }
  })
  console.log(albums)
  //?Step 3 => renderizzare
  let row = document.querySelector("#es1")
  row.innerHTML = albums.slice(0, 4).map((al) => {
    return ` <div class='col col-2'> <div class="card">
        <img src="${al.cover_xl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-truncate">${al.title}</h5>
        </div>
      </div> </div>`
  })
}

const getSingleSong = async (songTitle) => {
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + songTitle
  )
  let {
    data: [song],
  } = await res.json()
  //decostruzione! l'equivalente di
  /* 
    const music = await res.json()
    const song = music.data[0]
  */
  console.log(song)
  const section = document.querySelector("#es2")
  section.innerHTML = `<div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${song.album.cover_xl}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${song.title}</h5>
        <p class="card-text">${song.album.title}</p>
        <p class="card-text"><small class="text-muted">${song.artist.name}</small></p>
      </div>
    </div>
  </div>
</div>`
}

const getAlbumByQuery = async (query) => {
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
  )
  const {
    data: [{ album }],
  } = await res.json()
  //decostruzione:
  /* 
        const music = await res.json()
        const album = music.data[0].album
    */
  console.log(album)
  const carInn = document.querySelector(".carousel-inner")
  let isFirst = carInn.childNodes.length < 1
  console.log(isFirst);
  carInn.innerHTML += `<div class="carousel-item ${!isFirst ? "active" : ""}">
    <img src="${album.cover_xl}" class="d-block w-100" alt="..." />
    <div class="carousel-caption d-none d-md-block">
      <h5>${album.title}</h5>
    </div>
  </div>
  `
}
window.onload = () => {
  fetchMusic("pinguini tattici nucleari") //es. 1
  getSingleSong("charity's soliloquy")
  const albumQueries = [
    "8 billion people nivi",
    "multiverse maya manuela",
    "everything to everyone rene rapp",
  ]
  for (const album of albumQueries) {
    getAlbumByQuery(album)
  }
}
