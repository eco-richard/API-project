import './SpotShowImages.css';

function SpotShowImages({ spot }) {
    const noImageURL = "https://www.clydeinc.com/wp-content/uploads/no_photo_yet.jpg";
    const previewImgURL = spot.SpotImages?.find(spotImg => spotImg.preview === true).url;

    let nonPreviewImgsURLs = []
    for (const currentSpot of spot.SpotImages) {
        if (currentSpot.preview === false) {
            nonPreviewImgsURLs.push(currentSpot.url);
        }
    }

    // Populate nonPreviewImgsURLs with noImageURL until we reach the needed 5
    while (nonPreviewImgsURLs.length < 4) {
        nonPreviewImgsURLs.push(noImageURL);
    }

    let gridCounter = 0;

    return (
        <div className="spot-show-images-wrapper">
            <div className="spot-show-main-image-wrapper">
                <img className="spot-show-main-image fill-width fill-height" src={previewImgURL} alt="main"/>
            </div>
            <div className="spot-show-image-grid">
                {nonPreviewImgsURLs.map(url => gridCounter < 5 && (
                    <img 
                    className={`spot-show-grid-${++gridCounter} fill-width fill-height`}
                    key={gridCounter}
                    src={url} alt={`grid-${gridCounter}`} 
                    />
                ))}
            </div>
        </div>
    )
}

export default SpotShowImages;