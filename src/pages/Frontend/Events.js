import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, where, query } from 'firebase/firestore';
import { firestore, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function Events() {

  const { users } = useContext(AuthContext);
  const user = users.user

  const [imgURL, setImgURL] = useState("");
  const [progress, setProgress] = useState(0);

  const [myDocuments, setMyDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [event, setEvent] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const handleChange = e => {
    setEvent(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const fetchMyDocuments = async () => {
    let array = []
    const q = query(collection(firestore, "events"),
      where("createdBy.uid", "==", user.uid)
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setMyDocuments(array)
    setIsLoading(false)
  }

  const fetchAllDocuments = async () => {
    let array = []
    const q = query(collection(firestore, "events"),
      // where("createdBy.uid", "==", user.uid)
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setAllDocuments(array)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMyDocuments()
    fetchAllDocuments()
  }, [users])

  const handleImgChange = (e) => {
    let file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    let randomId = window.getRandomId();
    // console.log(randomId + "." + fileExt)
    // console.log(userAuth.uid + "." + fileExt)
    let imgName = `eventImages/${randomId}.${fileExt}`
    console.log(imgName)
    const imageRef = ref(storage, imgName)
    const uploadTask = uploadBytesResumable(imageRef, file);
    setIsImgLoading(true)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress)
      },
      (err) => {
        console.error(err)
        setIsImgLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let eventImg = downloadURL;
          setImgURL(eventImg)
          setIsImgLoading(false)
        });
      },
      (err) => {
        console.error(err)
      }
    );
  }

  const handleUpdate = async () => {

    let formData = { ...event };

    formData.dateModified = serverTimestamp();
    // console.log(formData)
    // formData.id = window.getRandomId();
    // console.log(formData.id)
    formData.img = imgURL;
    // formData.modifiedBy = {
    //   email: user.email,
    //   uid: user.uid,
    // }
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "events", formData.id), formData, { merge: true });
      window.notify("Event has been successfully Updated", "success")

      let newDocuments = myDocuments.map((doc) => {
        if (doc.id === event.id)
          return event
        return doc
      })
      setMyDocuments(newDocuments)

    } catch (err) {
      console.error(err)
      window.notify("Something went wrong, Event isn't updated", "error")
    }
    setIsProcessing(false)
  }

  const handleDelete = async (event) => {
    try {
      await deleteDoc(doc(firestore, "events", event.id));
      window.notify("Event has been successfully deleted", "success")
      let newDocuments = myDocuments.filter((doc) => {
        return doc.id !== event.id
      })
      setMyDocuments(newDocuments);
    } catch (err) {
      console.error(err)
      window.notify("Something went wrong", "error")
    }

  }
  const handleJoin = async (event) => {
    try {
      await deleteDoc(doc(firestore, "events", event.id));
      window.notify("Event has been successfully deleted", "success")
      let newDocuments = myDocuments.filter((doc) => {
        return doc.id !== event.id
      })
      setMyDocuments(newDocuments);
    } catch (err) {
      console.error(err)
      window.notify("Something went wrong", "error")
    }

  }

  return (
    <>
      {
        user ?
          <div className="py-5 events">
            <div className='container'>
              <div className="row py-3">
                <div className="col mb-3">
                  <h1 className='text-center'>My Events</h1>
                </div>
              </div>
              <div className="row d-flex justify-content-between">
                {!isLoading
                  ?
                  myDocuments.map((event, i) => {
                    return <div className="col-12 col-md-4 rounded d-flex flex-column align-items-center" key={i}>
                      <div className="card mb-2 d-flex align-items-center border-0" style={{ width: "300px" }}>
                        <div className='cardImg'>
                          <img src={event.img} className="card-img-top w-100 h-100" alt="event" />
                        </div>
                        <div className="card-body border w-100">
                          <h5 className="card-title">{event.title}</h5>
                          <p className="card-text">{event.date} {event.time}</p>
                          {/* <p className="card-text"></p> */}
                          <p className="card-text">{event.location}</p>
                          <p className="card-text">{event.description}</p>
                          <button className='btn btn-info mx-2 text-white' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setEvent(event) }}>Edit</button>
                          <button className='btn btn-info mx-2 text-white' onClick={() => { handleDelete(event) }}>Delete</button>
                        </div>
                      </div>
                    </div>
                  })
                  : <div className='text-center'><div className='spinner-grow'></div></div>
                }
              </div>
            </div>
          </div> :
          ""
      }

      <div className="py-5 events">
        <div className='container'>
          <div className="row py-3">
            <div className="col mb-3">
              <h1 className='text-center'>All Events</h1>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            {!isLoading
              ?
              allDocuments.map((event, i) => {
                return <div className="col-12 col-md-4 rounded d-flex flex-column align-items-center" key={i}>
                  <div className="card mb-2 d-flex align-items-center border-0" style={{ width: "300px" }}>
                    <div className='cardImg'>
                      <img src={event.img} className="card-img-top w-100 h-100" alt="event" />
                    </div>
                    <div className="card-body border w-100">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">{event.date} {event.time}</p>
                      {/* <p className="card-text"></p> */}
                      <p className="card-text">{event.location}</p>
                      <p className="card-text">{event.description}</p>
                      <button className='btn btn-info text-white' onClick={() => { handleJoin(event) }}>Join Event</button>
                    </div>
                  </div>
                </div>
              })
              : <div className='text-center'><div className='spinner-grow'></div></div>
            }
          </div>
        </div>
      </div>
      {/* Modal */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <input type="text" name='title' className='form-control shadow-none' placeholder='Enter Title' value={event.title} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="date" name='date' className='form-control  shadow-none' placeholder='Enter Date' value={event.date} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="time" name='time' className='form-control shadow-none' placeholder='Enter Time' value={event.time} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="text" name='location' className='form-control shadow-none' placeholder='Enter Location' value={event.location} onChange={handleChange} />
                </div>
                <div className="row w-100 m-0 p-0">
                  <div className="col mb-3">
                    <input type="file" accept='image/*' name='title' className='form-control shadow-none' placeholder='Add Image' onChange={handleImgChange} />
                    {
                      isImgLoading ? <div className="progress my-1" role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
                      </div> : ""
                    }
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <textarea name='description' className='form-control shadow-none' rows="5" placeholder='Enter Description' value={event.description} onChange={handleChange} ></textarea>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col text-end">
                  <button className='btn btn-info text-white mx-2' data-bs-dismiss="modal" onClick={handleUpdate} disabled={isProcessing}>
                    {
                      !isProcessing
                        ? "Update Event"
                        : <div className="spinner-border spinner-border-sm"></div>
                    }
                  </button>
                  <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



