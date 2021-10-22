
import Classes from './NotFound.module.css'
import NotFounds from '../../assets/images/notfound.jpg'
const NotFound = () =>{
    return(
        <div className='col-md-12 nopadmar'>
            <div className={Classes.Page}>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className={Classes.NotFoundImg}>
                    <img src={NotFounds} alt='notFound' />
                </div>
                </div>
                <h2 className={Classes.NotFoundCaptn}>OPPS! PAGE NOT FOUND</h2>

            </div>

        </div>

    )
}
export default NotFound