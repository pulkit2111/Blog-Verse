//share buttons
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon} from 'react-share';
import './shareButtons.css'

export const ShareButtons=({url, title})=>{
    return(
        <div className='share-buttons'>
            <FacebookShareButton url={url} quote={title} style={{margin:"0 0.5vw"}}>
                <FacebookIcon size={'100%'} round className='share-button'/>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title} style={{margin:"0 0.5vw"}}>
                <TwitterIcon size={'100%'} round className='share-button'/>
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} source="Blog Verse" style={{margin:"0 0.5vw"}}>
                <LinkedinIcon size={'100%'} round className='share-button'/>
            </LinkedinShareButton>
        </div>
    )
}