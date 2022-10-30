import {useState, useEffect} from 'react'
import Switch from "react-switch";

import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

import baseURL from '../src/static/baseURL';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import {currentUser} from '../src/state/atoms/user'
import { useRecoilState } from 'recoil';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

function CreatePost() {

    const [state, setState] = useState({
        description: '', title: '', isSubmit: false, is_visible: true,
        short_description: '', image: null, category_id: null,
        isSubmit: false

    })

    const token = cookies.get('token')

    const [user, setUser] = useRecoilState(currentUser);
    const [categories, setCategories] = useState([])

    const handleChange = (event, id) => {
        setState({...state, [id] : event.target ? event.target.value : event});
    };

    const onFileChange = event => { 
        setState({ ...state, image: event.target.files[0] }); 
    };

    const onSubmit = () => {
        setState({...state, isSubmit: true})
        let config = { headers: { 'Content-Type': 'multipart/form-data', authorization: 'Bearer '+ token} };
        if(state.title && state.short_description && state.image && state.category_id ){
            baseURL.post('/api/article/create', state, config)
            .then(res => {
                window.location.href = '/articles'
            }).catch(err => {
                alert('error')
                console.log(err)
            })
        }
    }

    useEffect( () => {
        baseURL.get('/api/article-category')
        .then(res => {
            setCategories(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    },[])
    

    return (
        <div className="my-5 container py-5">
            <div className="row my-3">
                <div className="col-lg-7">
                    <h2 className="h3">Create a New Article</h2>
                    <div class="mt-4 mb-4">
                        <label className="form-label h6">Title</label>
                        <input type="email" className="form-control" placeholder="Enter your Article Title" onChange={event => handleChange(event, 'title')} />
                        {state.isSubmit && !state.title && <div className="text-danger">Title is required</div>}
                    </div>

                    <QuillNoSSRWrapper style={{height:'1000px'}} theme="snow" onChange={event => handleChange(event, 'description')} />

                </div>
                <div className="col-lg-5">
                    <h2 className="h3">Publication Detail</h2>
                    <div class="mt-4">
                        <label className="form-label h6">Short Description</label>
                        <textarea type="email" className="form-control" placeholder="Enter your Article Short Description" onChange={event => handleChange(event, 'short_description')} ></textarea>
                        {state.isSubmit && !state.short_description && <div className="text-danger">Short Description is required</div>}
                    </div>

                    <div class="mt-4">
                        <label className="form-label h6">Thumbnail</label>
                        <input type="file" accept='.jpg,.png' className="form-control" onChange={onFileChange} />
                        {state.isSubmit && !state.image && <div className="text-danger">Thumbnail is required</div>}
                    </div>

                    <div class="mt-4">
                        <label className="form-label h6">Categories</label>
                        <select className='form-control' onChange={event => handleChange(event, 'category_id')}>
                            <option>Select Category</option>
                            {categories.map((category, index) => (
                                <option value={category.arc_id}>{category.title}</option>
                            ))}
                        </select>
                        {state.isSubmit && !state.category_id && <div className="text-danger">Category is required</div>}
                    </div>

                    <div class="mt-4 d-flex align-items-center justify-content-between">
                        <label className="form-label h6">Is Published</label>
                        <Switch onChange={event => setState({...state, is_visible: event})} checked={state.is_visible} />
                    </div>

                    {user ? (
                        <button className='btn btn-danger mt-4' onClick={onSubmit}>
                            Publish
                        </button>
                    ) : (
                        <div className="text-danger mt-4">You need to login to publish</div>
                    )}


                </div>
            </div>
        </div>
    );
}

export default CreatePost;