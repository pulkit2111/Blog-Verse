import React from 'react';
import './banner.css';

const Banner=()=>{
    return (
    <div className='banner'>
        <h1 className='banner-heading'>Blog Verse <br />Blogs and Stories</h1>
        <div className='top-left'>
            <img className='banner-img' style={{height: "10vw", width:"10vw" }} src="https://i.pinimg.com/564x/7d/83/c5/7d83c5b60ee45f5949183aa587b665c4.jpg" alt="" />
            <img className='banner-img' style={{height:"7vw", width:"7vw"}} src="https://i.pinimg.com/564x/5f/87/01/5f87010e0785926f488c70ec4b0836a6.jpg" alt="" />
            <img className='banner-img' style={{height:"6vw", width:"5vw"}} src="https://i.pinimg.com/564x/6b/91/49/6b91491e35c4011984127ac9bcfa9dbe.jpg" alt="" />
        </div>
           
        <div className='bottom-left'>
            <img className='banner-img' style={{height: "10vw", width:"10vw" }} src="https://i.pinimg.com/564x/dd/bf/63/ddbf635d307212bfb95b37d4603e2535.jpg" alt="" />
            <img className='banner-img' style={{height:"7vw", width:"7vw"}} src="https://i.pinimg.com/564x/1c/41/91/1c4191c5287d6cdc72a30dcefc095518.jpg" alt="" />
            <img className='banner-img' style={{height:"6vw", width:"5vw"}} src="https://i.pinimg.com/564x/57/f8/63/57f863cddd4d64c810a2a169a4e7bd94.jpg" alt="" />
            <img className='banner-img' style={{height:"5vw", width:"5vw"}} src="https://i.pinimg.com/564x/3d/74/63/3d74639d40ae75295fd25719ce35b886.jpg" alt="" />
        </div>

        <div className='top-right'>
            <img className='banner-img' style={{height:"5vw", width:"4vw"}} src="https://i.pinimg.com/564x/be/b1/73/beb17375fe09236a6c94a3ffd2c7e2ae.jpg" alt="" />
            <img className='banner-img' style={{height:"6vw", width:"5vw"}} src="https://i.pinimg.com/564x/47/1d/70/471d703b048523387b2dac304699480b.jpg" alt="" />
            <img className='banner-img' style={{height:"8vw", width:"7vw"}} src="https://i.pinimg.com/564x/06/f8/a2/06f8a21d2da0136784b170461fa89f3b.jpg" alt="" />
            <img className='banner-img' style={{height: "10vw", width:"10vw" }} src="https://i.pinimg.com/564x/90/76/ff/9076ffe25767c5003290da18ff86b26b.jpg" alt="" />
        </div>

        <div className='bottom-right'>
            <img className='banner-img' style={{height:"5vw", width:"5vw"}} src="https://i.pinimg.com/564x/91/56/5f/91565f23845f02ef59b8f7ab6be60cf9.jpg" alt="" />
            <img className='banner-img' style={{height:"8vw", width:"7vw"}} src="https://i.pinimg.com/564x/37/e3/22/37e322a5c45bbe8bde9e5c74e5a3b839.jpg" alt="" />
            <img className='banner-img' style={{height: "10vw", width:"10vw" }} src="https://i.pinimg.com/564x/60/8f/30/608f3052445164fd4e90e6153f84584d.jpg" alt="" />
        </div>
    </div>
    )
}

export default Banner;