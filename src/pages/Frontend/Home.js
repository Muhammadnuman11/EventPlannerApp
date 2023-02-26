import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import crosl1 from "../../asset/Images/crosl1.jpg"
import crosl2 from "../../asset/Images/crosl2.jpg"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Home() {
    return (
        <>
            <Carousel fade style={{ width: '100%', height: '90vh' }}>
                <Carousel.Item style={{ width: '100%', height: '100%' }}>
                    <div className="w-100" style={{height: '90vh' }}>
                    <img
                        className="d-block w-100 h-100"
                        src={crosl1}
                        alt="First slide"
                    />
                    </div>
                    <Carousel.Caption style={{ bottom: '100px'}}>
                        <h1>Enjoy Events</h1>
                        <p>Enjoy holiday night with guys</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="w-100" style={{height: '90vh' }}>
                    <img
                        className="d-block w-100 h-100"
                        src={crosl2}
                        alt="Second slide"
                    />
                    </div>

                    <Carousel.Caption style={{ bottom: '100px'}}>
                        <h1>Join Events</h1>
                        <p>Join your favrout events</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="container py-5 about">
                <div className="row mb-4">
                    <div className="col text-center">
                        <h1>About</h1>
                    </div>
                </div>
                <div className="row d-flex flex-column flex-md-row">
                    <div className="col d-flex align-items-center">
                        <div className="para">
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel totam quam, molestias in illo fugiat, repellat dignissimos perspiciatis ipsam dolores, fuga mollitia. Sed aut minima rem minus sunt, vel ab sint eveniet culpa maiores aliquid! Rerum eveniet officiis reiciendis ipsam, assumenda incidunt at numquam libero laudantium minus harum cum alias.</p>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className="aboutImg">
                            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5 about">
            <div className="row mb-4">
                    <div className="col text-center">
                        <h1>Events Detail</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Night Event</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Holyday Event</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1635321101901-7ac6eec3d371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxldmVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Birthday Event</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
