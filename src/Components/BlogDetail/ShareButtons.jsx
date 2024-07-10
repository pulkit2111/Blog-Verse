//share buttons
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon} from 'react-share';

export const ShareButtons=({url, title})=>{
    return(
        <div>
            <FacebookShareButton url={url} quote={title} style={{margin:"0 0.5vw"}}>
                <FacebookIcon size={32} round/>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title} style={{margin:"0 0.5vw"}}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} source="Blog Verse" style={{margin:"0 0.5vw"}}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    )
}