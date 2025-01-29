import slide1 from '../assets/slide01.jpg'
import slide2 from '../assets/slide02.jpg'
import slide3 from '../assets/slide03.jpg'
import {Carousel} from "react-bootstrap";



const Home = () => {
    return (
        <div className="row">
            <Carousel  variant='dark'>
                <Carousel.Item>
                    <img src={slide1} alt="slide1" className='d-block w-100'/>
                </Carousel.Item>
                 <Carousel.Item>
                    <img src={slide2} alt="slide2" className='d-block w-100'/>
                </Carousel.Item>
                 <Carousel.Item>
                    <img src={slide3} alt="slide3" className='d-block w-100'/>
                </Carousel.Item>

            </Carousel>

        </div>
    )
}

export default Home