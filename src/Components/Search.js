
const Search = ({setSearchName}) => {
  
  return (
    <div>
      <input placeholder='search for movie' onChange={(e)=>setSearchName(e.target.value)}/>
    </div>
  )
}

export default Search
