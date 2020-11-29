import {db} from './firebase'
import {useState, useEffect} from 'react'

function App() {

  const [libros, setLibros] = useState([])
  const [titulo, setTitulo] = useState([])
  const [autor, setAutor] = useState([])
  const [clasificacion, setClasificacion] = useState([])
  const [editorial, setEditorial] = useState([])
  const [idLibro, setIdLibro] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [modoEliminar, setModoEliminar] = useState(false)
  const [id, setId] = useState('')

  const getLibros = async () =>{
    const data = await db.collection('libros').get()
    const arrayLibros = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLibros(arrayLibros)
    console.log(libros)
  }

    useEffect(()=>{
      getLibros()
   },[]) // eslint-disable-line react-hooks/exhaustive-deps

   const limpiarIns =() =>{
    setAutor("")
    setClasificacion("")
    setEditorial("")
    setIdLibro("")
    setTitulo("")
    setId("")
   }

   const agregarLibro = async(e)=>{
      e.preventDefault()
      const firebaseLibros = await db.collection('libros').add({
        Autor: autor,
        Clasificacion: clasificacion,
        Editorial: editorial,
        IdLibro: idLibro,
        Titulo: titulo
      })
      limpiarIns()
      getLibros()
   }

    const activarEdicion = (item) =>{
      setModoEdicion(true)
      if(!modoEdicion){
        setAutor(item.Autor)
        setClasificacion(item.Clasificacion)
        setEditorial(item.Editorial)
        setIdLibro(item.IdLibro)
        setTitulo(item.Titulo)
        setId(item.id)
      }else{
        setModoEdicion(false)
        limpiarIns()
      }
      
    }

    const activarEliminar = (item) =>{
      setModoEliminar(!modoEliminar)
    }

    const editarLibro = async(e) =>{
      e.preventDefault()
      const firebaseLibros = await db.collection('libros').doc(id).update({
        Autor: autor,
        Clasificacion: clasificacion,
        Editorial: editorial,
        IdLibro: idLibro,
        Titulo: titulo
      })
      setModoEdicion(false)
      limpiarIns()
      getLibros() 
    }

    const eliminarLibro = async(id) =>{
      await db.collection('libros').doc(id).delete()
      activarEliminar()
      getLibros()
    }

  return (
    <body className = "bg-info">
    <div className = "container bg-default">
      <h1>Listado</h1>
      {modoEdicion ? <h2>Editar</h2> : <h2>Agregar</h2>}
      <form onSubmit = {modoEdicion ? editarLibro : agregarLibro}>
          <div className="container form-group">
            <label>Autor</label>
            <input type="text" className="form-control" value={autor} onChange={e => setAutor(e.target.value)} required></input>
            <label>Id</label>
            <input type="text" className="form-control" value={idLibro} onChange={e => setIdLibro(e.target.value)} required></input>
            <label>Clasificacion</label>
            <input type="text" className="form-control" value={clasificacion} onChange={e => setClasificacion(e.target.value)} required></input>
            <label>Editorial</label>
            <input type="text" className="form-control" value={editorial} onChange={e => setEditorial(e.target.value)} required></input>
            <label>Titulo</label>
            <input type="text" className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} required></input>
            <button type="submit" className="btn btn-success btn-block">Aceptar</button>
          </div>
          
      </form>
      <ul className = "list-group ">
        {
        libros.map(item => (
          <li className = "list-group-item bg-primary" key = {item.id}>
            <ul className="list-group-item bg-secondary text-white"> Autor: {item.Autor}</ul>
            <ul className="list-group-item bg-secondary text-white"> ID: {item.IdLibro}</ul>
            <ul className="list-group-item bg-secondary text-white"> Clasificacion: {item.Clasificacion}</ul>
            <ul className="list-group-item bg-secondary text-white"> Editorial: {item.Editorial}</ul>
            <ul className="list-group-item bg-secondary text-white"> Titulo: {item.Titulo}</ul>
            {modoEdicion ? <button className = "btn btn-warning btn-block " onClick={() => activarEdicion(item)}>Cancelar edicion</button> : 
            <button className = "btn btn-warning btn-block " onClick={() => activarEdicion(item)}>Editar</button>}
            {modoEliminar ?
            <h>
              Seguro?
              <button className = "btn btn-danger btn-block " onClick={() => eliminarLibro(item.id)}>Si</button>
              <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(item)}>No</button>
            </h> 
            : <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(item)}>Eliminar</button>}
            
        </li>
        ))
        }
      </ul>
    </div>
    </body>
  );
}

export default App;
