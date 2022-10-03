import axios from "axios";
import React , {useState} from "react";
import { useNavigate } from "react-router-dom";


const CreateNote = () => {
	const [note,setNote] = useState({
		title: '',
		content: '',
		date: ''
	})

	const navigate = useNavigate()

	const onChangeInput = e =>{
		const {name,value} = e.target;
		setNote({...note,[name]:value})
	}

	const createNote = async e =>{
		e.preventDefault()
		try{
			const token = localStorage.getItem('tokenStore')
			if(token){
				const {title,content,date} = note;
				const newNote = {
					title,content,date
				}

				await axios.post('/api/notes' , newNote , {
					headers: {Authorization: token }
				})

				return navigate('/')
			}
		} catch (err) {
			window.location.href = "/";
		}
	}

	return (
		<div className='create-note'>
			<h2>Create Note</h2>
			<form onSubmit={createNote} autoComplete="off" >
				<div className="row">
					<label htmlFor="title">Title</label>
					<input type='text' value={note.title} id="title"
					name="title" required onChange={onChangeInput}/>
				</div>
				<div className="row">
					<label htmlFor="content">Content</label>
					<textarea type='text' value={note.content} id="content"
					name="content" required rows="10" onChange={onChangeInput}/>
				</div>
				<label htmlFor="date">Due Date: {note.date}</label>
				<div className="row">
					<input type='date' id="date" min={new Date().toISOString().split('T')[0]}
					name="date" onChange={onChangeInput}/>
				</div>

				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default CreateNote;
