import React,{useState} from "react"

const App=()=>{
  const [search,setSearch] = useState('');
  const [data,setData] = useState([]);
  const submitHandler = e =>{
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
      response => response.json()
    ).then(value => setData(value.Search)) 
  }
  const download = url => {
    fetch(url).then(response=>{
      response.arrayBuffer().then(function(buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch(err => {
      console.log(err);
    });
  };
  return(
    <div>
      <center>
        <h1>Search for movies</h1>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/><br/><br/>
          <input type="submit" value="search"/>
        </form>
        <div className="row">
        {data.map (movie=>
          <div className="col-md-4">
           <div class="card" style={{"width": "18rem"}}>
            <img src={movie.Poster} class="card-img-top" alt={movie.Title}/>
            <div class="card-body">
             <h5 class="card-title">{movie.Title}</h5>
             <a className="btn btn-primary" onClick={()=>download(movie.Poster)}>Download Poster</a>
            </div>
           </div>
          </div>
         )}
         </div>
      </center>
    </div>
  )
}
export default App