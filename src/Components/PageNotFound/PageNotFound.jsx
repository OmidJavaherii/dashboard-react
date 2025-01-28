import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

export default function PageNotFound() {

    return ReactDOM.createPortal(
        <div className='modal-parent active'>
                <div className='not-found'>
                    <Link to='/home'>
                    <header class="top-header">
                    </header>
                    {/* <!--dust particel--> */}
                    <div>
                        <div class="starsec"></div>
                        <div class="starthird"></div>
                        <div class="starfourth"></div>
                        <div class="starfifth"></div>
                    </div>
                    {/* <!--Dust particle end---> */}


                    <div class="lamp__wrap">
                        <div class="lamp">
                            <div class="cable"></div>
                            <div class="cover"></div>
                            <div class="in-cover">
                                <div class="bulb"></div>
                            </div>
                            <div class="light"></div>
                        </div>
                    </div>
                    {/* <!-- END Lamp --> */}
                    <section class="error">
                        {/* <!-- Content --> */}
                        <div class="error__content">
                            <div class="error__message">
                                <h1 class="message__title">Page Not Found</h1>
                                <p class="message__text">متاسفانه صفحه مورد نظر  پیدا نشد...</p>
                            </div>
                            <div class="error__nav e-nav">
                                <Link to={'/home'} class="e-nav__link"></Link>
                            </div>
                        </div>
                        {/* <!-- END Content --> */}
                    </section>

                    </Link>
            </div>

        </div>, document.getElementById('modals-parent')
    )
}
