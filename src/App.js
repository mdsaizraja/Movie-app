import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./App.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function App() {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [titalName, setTitlName]=useState([])
  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/movies");
      const payload = await response.json();
      setMovies(payload.data);
    }
    getData();
  }, []);
    
  var details;
  const handleClickOpen = (id) => {
    setOpen(true);

  var a = movies.filter((el)=>{
      return id===el.id
    
    })  

setTitlName(a)
    
       
    }
  console.log(titalName[0])
   
   
    
      
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Tagline</TableCell>
              <TableCell align="right">Avg Vote</TableCell>
              <TableCell align="right">Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.original_title}
                </TableCell>
                <TableCell align="right">{row.tagline}</TableCell>
                <TableCell align="right">{row.vote_average}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={()=>handleClickOpen(row.id)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //modal */}

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <DialogContent>
           
            {
              titalName.map((el)=>{
                return (<>
                <h1 key={el.id}>{el.original_title}</h1>
                <h3 key={el.overview}>{}</h3>
                <h3 key={el.id}>{`Release Date ${el.release_date}`}</h3>
                <h3 key={el.id}>{`Runtime: ${el.runtime} min`}</h3>
                </>)

              })
            }
           



          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Back to Home
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
