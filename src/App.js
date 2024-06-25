import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  let [data , setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);

  let nextPage = ()=>{
    setCurrentPage((prev)=> (((prev+1)*10)-10)<data.length?prev+1:prev);
  };
  let prevPage = ()=>{
    setCurrentPage((prev)=> prev>1?prev-1:1);
  };

  function fillFiltersData(dataToFilter){
    let newArr = [];
    for(let i=(currentPage*10)-10;i<(currentPage*10);i++){
      if(i>=dataToFilter.length) break;
      newArr.push(dataToFilter[i]);
    }
    setFilteredData(newArr);
  }
  useEffect(()=>{
    fillFiltersData(data);
  },[currentPage, data]);

  useEffect(()=>{
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      fillFiltersData(data);
      setData(data)
    })
    .catch((err)=>{alert("failed to fetch data")});
  },[]);


  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table className="empTable" style={{width:"100vw",height:'70vh'}}>
        <tr style={{backgroundColor:"green",color:"white"}}>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {filteredData.map((fdata, index)=>(
          <tr key={index}>
            <td>{fdata.id}</td>
            <td>{fdata.name}</td>
            <td>{fdata.email}</td>
            <td>{fdata.role}</td>
          </tr>
        ))}

      </table>
      <div style={{display:"flex",justifyContent:"center", gap:'8px'}} className="buttons">
        <button onClick={prevPage}>Previous</button>
        <div className="currentPage">{currentPage}</div>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
